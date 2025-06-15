import { useEffect} from 'react';
import styles from '../../../styles/ManagerLayout.module.css';
import Header from '../Header';
import RequestsList from './RequestsList';
import { useManagerContext } from '../../../hooks/useManagerCon';
import CaseWorkerList from './CaseWorkerList';

const Manager = () => {
  const {fetchManagerData} = useManagerContext();
  useEffect(() => {
  
    fetchManagerData();
  }, [fetchManagerData]);

  return (
    <div>
      <Header />
      <div className={styles.managerContainer}>
        <div className={styles.leftPanel}>
          <RequestsList />
        </div>
        <div className={styles.rightPanel}>
          <CaseWorkerList />
        </div>
      </div>
    </div>
  );
};

export default Manager;