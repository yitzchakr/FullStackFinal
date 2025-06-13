const pool = require("../config/db");
const {ApiError} = require('../utils/apiError');

const caseworkerSql = `SELECT 
        u.id as caseworker_id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.role, 
        u.specialties, 
        u.region, 
        u.is_active,
        c.id as case_id,
        c.request_id,
        c.status as case_status,
        c.priority_level
     FROM users u 
     LEFT JOIN cases c 
     ON u.id = c.caseworker_id
     AND c.status IN ('assigned', 'active', 'on_hold')
     WHERE u.role = 'caseworker' 
     AND u.is_active = 1 
     ORDER BY u.id;`;
const unassignedCasesSql = `SELECT r.*
    FROM requests r
    LEFT JOIN cases c ON r.id = c.request_id
    WHERE c.request_id IS NULL
    AND r.status = 'submitted'`;

const getManagerOverview = async () => {
  try {
    const [reqRows] = await pool.query(unassignedCasesSql);
    const [cwRows] = await pool.query(caseworkerSql);

    const cwMap = new Map();

    cwRows.forEach((r) => {
      if (!cwMap.has(r.caseworker_id)) {
        cwMap.set(r.caseworker_id, {
          id: r.caseworker_id,
          firstName: r.first_name,
          lastName: r.last_name,
          region: r.region,
          specialties: (r.specialties || "[]"),
          cases: [],
        });
      }

      if (r.case_id) {
        cwMap.get(r.caseworker_id).cases.push({
          id: r.case_id,
          requestId: r.request_id,
          status: r.case_status,
          priority: r.priority_level,
        });
      }
    });
    return {
      caseworkers: Array.from(cwMap.values()),
      unassignedRequests: reqRows,
    };
  } catch (error) {
    console.error("Error fetching manager overview:", error);
    throw new ApiError(500,'[failed to fetch');
  }
};
const assignCaseworker = async (requestId, caseworkerId,assignedBy,priorityLevel) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO cases (request_id, caseworker_id, assigned_by, priority_level, status) 
       VALUES (?, ?, ?, ?, 'assigned')`,
      [requestId, caseworkerId, assignedBy, priorityLevel]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error assigning caseworker:", error);
    throw new ApiError(500,'[failed to assign caseworker');
  }
}
const  reassignCaseworker = async (caseId, caseworkerId) => {
  try {
    await pool.query(
      `UPDATE cases 
       SET caseworker_id = ?
       WHERE id = ?`,
      [caseworkerId, caseId]
    );
  }
  catch (error) {
    console.error("Error reassigning caseworker:", error);
    throw new ApiError(500,'[failed to reassign caseworker');
  }
}
const markRequestAssigned = async (requestId) => {
  try {
    await pool.query(
      `UPDATE requests 
       SET status = 'assigned' 
       WHERE id = ?`,
      [requestId]
    );
  }
  catch (error) {
    console.error("Error marking request as assigned:", error);
    throw new ApiError(500,'[failed to mark request as assigned');
  }
}

module.exports = 
  {getManagerOverview,assignCaseworker,markRequestAssigned,reassignCaseworker}
;
