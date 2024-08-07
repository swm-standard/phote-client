'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Tag from '@/components/tag';

const SearchedWords = ({
  tags,
  keywords,
  deleteWord,
}: {
  tags: string[];
  keywords: string[];
  deleteWord: (targetWord: string, isTag?: boolean) => void;
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
    if (tags.length >= 1) params.set('tags', tags.join(','));
    else params.delete('tags');

    if (keywords.length >= 1) params.set('keywords', keywords.join(','));
    else params.delete('keywords');

    replace(`${pathname}?${params.toString()}`);
  }, [tags, keywords]);

  return (
    <div className="flex flex-wrap gap-4">
      {tags.map((tag, idx) => (
        <Tag
          key={idx}
          tag={tag}
          isTag
          removeTag={() => deleteWord(tag, true)}
        />
      ))}
      {keywords.map((keyword, idx) => (
        <Tag key={idx} tag={keyword} removeTag={() => deleteWord(keyword)} />
      ))}
    </div>
  );
};

export default SearchedWords;
