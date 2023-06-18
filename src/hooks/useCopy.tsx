import { useRouter } from 'next/router';
import i18next from 'i18next';

import { CANNOT_COPY_CONTENT } from '@constants/utils';
import { useNestedModal } from '@contexts/NestedModalProvider';

type copyLinkType = {
  url: string;
  withOrigin?: boolean;
};
const useCopy = (alertMessage?: string) => {
  const router = useRouter();

  const { showModal } = useNestedModal({
    type: 'alert',
    title: i18next.t('common:successMessage.copy.title'),
    description: `${i18next.t('common:successMessage.copy.subtitle')} ${
      alertMessage ? alertMessage : ''
    }`,
  });
  const { showModal: showErrorModal } = useNestedModal({
    type: 'alert',
    title: i18next.t('common:successMessage.copy.fail'),
    description: CANNOT_COPY_CONTENT,
  });

  const copyLink = async ({ url, withOrigin = true }: copyLinkType) => {
    const locale = router.locale ? `/${router.locale}` : '';
    if (navigator.clipboard && typeof window !== 'undefined') {
      await navigator.clipboard.writeText(
        `${withOrigin ? window.location.origin + locale : ''}${url}`
      );

      showModal();
      return;
    }

    showErrorModal();
  };

  const copyImage = async ({ imgSrc }: { imgSrc?: string }) => {
    if (!imgSrc) return;

    const img = await fetch(imgSrc);
    const imgBlob = await img.blob();

    try {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': imgBlob })]);
      showModal();
    } catch (error) {
      console.error(error);
    }
  };

  const copyText = async (value: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      showModal();
      return;
    }

    showErrorModal();
  };

  return { copyLink, copyImage, copyText };
};

export default useCopy;
