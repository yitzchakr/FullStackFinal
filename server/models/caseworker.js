const db = require("../config/db");
const { ApiError } = require("../utils/apiError");

const getAllCases = async (caseworkerId) => {
  const query = `
    SELECT
      c.id as case_id,
      c.assigned_by,
      c.status as case_status,
      c.priority_level,
      c.created_at as case_created_at,
      c.updated_at as case_updated_at,
      r.id as request_id,
      r.client_first_name,
      r.client_last_name,
      r.client_email,
      r.client_phone,
      r.request_description,
      r.urgency_level,
      r.family_size,
      r.geographical_location,
      r.preferred_contact_method,
      r.submitted_at,
      r.status as request_status,
      cn.id as case_note_id,
      cn.note_content,
      cn.note_type,
      cn.created_by as note_created_by,
      cn.created_at as note_created_at,
      cu.id as case_update_id,
      cu.update_type,
      cu.description as update_description,
      cu.created_by as update_created_by,
      cu.created_at as update_created_at,
      ap.id as action_plan_id,
      ap.plan_description,
      ap.goals,
      ap.resources_provided,
      ap.milestones,
      ap.completion_date_estimate,
      ap.created_at as plan_created_at,
      ap.updated_at as plan_updated_at
    FROM cases c
    LEFT JOIN requests r ON c.request_id = r.id
    LEFT JOIN case_notes cn ON c.id = cn.case_id
    LEFT JOIN case_updates cu ON c.id = cu.case_id
    LEFT JOIN action_plans ap ON c.id = ap.case_id
    WHERE c.caseworker_id = ?
    ORDER BY c.id;
  `;

  try {
    const [rows] = await db.query(query, [caseworkerId]);
    if (rows.length === 0) {
      throw new ApiError(404, "No cases found for this caseworker");
    }

    // Group by case_id
    const caseMap = new Map();

    for (const row of rows) {
      if (!caseMap.has(row.case_id)) {
        caseMap.set(row.case_id, {
          id: row.case_id,
          assigned_by: row.assigned_by,
          status: row.case_status,
          priority_level: row.priority_level,
          created_at: row.case_created_at,
          updated_at: row.case_updated_at,
          request: {
            id: row.request_id,
            client_first_name: row.client_first_name,
            client_last_name: row.client_last_name,
            client_email: row.client_email,
            client_phone: row.client_phone,
            request_description: row.request_description,
            urgency_level: row.urgency_level,
            family_size: row.family_size,
            geographical_location: row.geographical_location,
            preferred_contact_method: row.preferred_contact_method,
            submitted_at: row.submitted_at,
            status: row.request_status,
          },
          case_notes: [],
          case_updates: [],
          action_plans: [],
        });
      }

      const caseObj = caseMap.get(row.case_id);

      // Add note if present and not already added
      if (
        row.case_note_id &&
        !caseObj.case_notes.some((n) => n.id === row.case_note_id)
      ) {
        caseObj.case_notes.push({
          id: row.case_note_id,
          note_content: row.note_content,
          note_type: row.note_type,
          created_by: row.note_created_by,
          created_at: row.note_created_at,
        });
      }

      // Add update if present and not already added
      if (
        row.case_update_id &&
        !caseObj.case_updates.some((u) => u.id === row.case_update_id)
      ) {
        caseObj.case_updates.push({
          id: row.case_update_id,
          update_type: row.update_type,
          description: row.update_description,
          created_by: row.update_created_by,
          created_at: row.update_created_at,
        });
      }

      // Add action plan if present and not already added
      if (
        row.action_plan_id &&
        !caseObj.action_plans.some((a) => a.id === row.action_plan_id)
      ) {
        caseObj.action_plans.push({
          id: row.action_plan_id,
          plan_description: row.plan_description,
          goals: row.goals,
          resources_provided: row.resources_provided,
          milestones: row.milestones,
          completion_date_estimate: row.completion_date_estimate,
          created_at: row.plan_created_at,
          updated_at: row.plan_updated_at,
        });
      }
    }

    return Array.from(caseMap.values());
  } catch (error) {
    console.log("Database query error:", error);

    throw new ApiError(500, "Database query failed", error);
  }
};

module.exports = { getAllCases };
