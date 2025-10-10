import { getWorkspaceById, getPostsByWorkspaceId } from '@/lib/data';
import { redirect } from 'next/navigation';
import WorkspaceClientPage from './WorkspaceClientPage';

export default async function WorkspaceDetailPage({ params }: { params: Promise<{ workspaceId: string }>}) {
    
    const awaitedParams = await params;
    
    const [workspace, posts] = await Promise.all([
        getWorkspaceById(awaitedParams.workspaceId),
        getPostsByWorkspaceId(awaitedParams.workspaceId),
    ]);

    if (!workspace) {
        redirect('/dashboard');
    }

    return <WorkspaceClientPage workspace={workspace} initialPosts={posts} />;
}