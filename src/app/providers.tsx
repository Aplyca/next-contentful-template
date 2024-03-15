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
      locale="[DEFAULT_LOCALE]"
      enableInspectorMode={isEnabledDraft}
      enableLiveUpdates={isEnabledDraft}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};
