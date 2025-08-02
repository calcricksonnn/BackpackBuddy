import { useState } from 'react';
import { uploadFile } from '../firebase/storage';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const upload = async (uri: string, path: string) => {
    try {
      setUploading(true);
      const result = await uploadFile(uri, path);
      setUrl(result);
      return result;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, url };
};