import html2canvas from 'html2canvas';

const useSaveImage = () => {
  const onSaveAs = (uri: string, filename: string) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  const convertImage = async () => {
    const dom = document.querySelector('#capture') as HTMLElement;
    if (!dom) return;
    let url = '';
    await html2canvas(dom, { useCORS: true }).then(async (canvas) => {
      url = await canvas.toDataURL('image/png');
      // onSaveAs(canvas.toDataURL('image/png'), 'image-download.png');
    });

    return url;
  };

  const saveToImage = () => {
    const dom = document.querySelector('#capture') as HTMLElement;
    if (!dom) return;

    html2canvas(dom, { useCORS: true }).then((canvas) => {
      onSaveAs(canvas.toDataURL('image/png'), 'image-download.png');
    });
  };

  return { saveToImage, convertImage };
};

export default useSaveImage;
