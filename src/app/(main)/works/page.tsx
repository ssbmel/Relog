import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import WorksList from '@/src/features/works/components/works-list';
import { createClient } from '@/src/utils/supabase/server';
import { getWorks } from '@/src/features/works/services/get-works';

export default async function WorksPage() {
  const supabase = await createClient();
  const works = await getWorks(supabase);

  return (
    <div>
      <DashboardHeader
        title="Works"
        description="모든 작업 이력을 확인하세요."
      />
      <div className="p-8">
        <WorksList initialWorks={works || []} />
      </div>
    </div>
  );
}
