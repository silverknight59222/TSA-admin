import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

function Overview() {
  return <></>;
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
