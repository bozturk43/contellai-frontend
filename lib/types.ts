export type LoginPayload = {
    email: string;
    password: string;
};

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    coinBalance: number;
};

export type LoginResponse = {
    token: string;
    user: UserProfile;
};

export type Post = {
  id: string;
  generatedText: string;
  generatedAssetUrl: string;
  createdAt: string;
  status: number;
  contentType: number;
};

export type Account = {
  id: string;
  platformUsername: string;
  platform: number;
};

export type Workspace = {
  id: string;
  brandName: string;
  industry: string;
  connectedAccounts: Account[];
};

export enum PlatformType {
    Instagram = 1,
    Facebook = 2,
    Twitter = 3
}

export type ConnectAccountPayload = {
  workspaceId: string;
  platform: PlatformType;
  platformUsername: string;
};

export type ConnectedAccountResponse = {
    id: string;
    workspaceId: string;
    platform: PlatformType;
    platformUsername: string;
    createdAt: string;
};
export type SaveContentPostDto = {
    workspaceId: string;
    userPrompt: string;
    generatedText: string;
    generatedAssetUrl: string;
    contentType: number;
};
export enum ContentType {
    Post = 1,
    Story = 2,
    Reels = 3
}
export type CreateContentPostPayload = {
  workspaceId: string;
  contentType: ContentType;
  userPrompt: string;
};

export type GeneratedContentResult = {
  text: string;
  imageUrl: string;
};

export type CreateWorkspaceDto = {
  brandName: string;
  industry?: string;
  targetAudience?: string;
  brandTone?: string;
  keywords?: string;
};