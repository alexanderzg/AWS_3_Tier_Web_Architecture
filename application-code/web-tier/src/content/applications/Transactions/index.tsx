import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <RecentOrders />
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
