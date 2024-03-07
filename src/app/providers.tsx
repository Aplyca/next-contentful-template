'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export const Providers = ({
  children,
  isEnabledDraft,
}: {
  children: React.ReactNode;
  isEnabledDraft: boolean;
}): React.ReactElement => {
  return (
    <ContentfulLivePreviewProvider
      locale="en"
      enableInspectorMode={isEnabledDraft}
      enableLiveUpdates={isEnabledDraft}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};
