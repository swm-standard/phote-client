'use client';

import React, { useEffect, useState } from 'react';
import CtrlTextInput from '@/components/custom/ctrl-text-input';
import { useImmer } from 'use-immer';
import SearchedWords from '@/app/main/question/searched-words';
import { useSearchParams } from '@storybook/nextjs/navigation.mock';
import { usePathname, useRouter } from 'next/navigation';

const SearchHeader = ({
  searchedQuestionNumber,
}: {
  searchedQuestionNumber: number;
}) => {
  const [tags, updateTags] = useImmer<string[]>([]);
  const [keywords, updateKeywords] = useImmer<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchValue(e.target.value);
  };

  const deleteWord = (targetWord: string, isTag = false) => {
    if (isTag)
      updateTags((draft) => draft.filter((word) => word !== targetWord));
    else updateKeywords((draft) => draft.filter((word) => word !== targetWord));
  };

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== 'Enter') return;
    // 입력 예외처리 필요

    if (searchValue[0] === '#')
      updateTags((draft) => {
        draft.push(searchValue.slice(1));
      });
    else
      updateKeywords((draft) => {
        draft.push(searchValue);
      });
    setSearchValue('');
  };

  useEffect(() => {
    const readTags = searchParams.get('tags');
    const readKeywords = searchParams.get('keywords');

    readTags && updateTags((draft) => [...readTags.split(',')]);
    readKeywords && updateKeywords((draft) => [...readKeywords.split(',')]);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (tags.length >= 1) params.set('tags', tags.join(','));
    else params.delete('tags');

    if (keywords.length >= 1) params.set('keywords', keywords.join(','));
    else params.delete('keywords');

    replace(`${pathname}?${params.toString()}`);
  }, [tags, keywords]);

  return (
    <div>
      <h1>검생된 문제 {searchedQuestionNumber}</h1>
      <p>#을 통해 태그 검색도 가능해요!</p>
      <CtrlTextInput
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleEnterPress}
      />
      <SearchedWords tags={tags} keywords={keywords} deleteWord={deleteWord} />
    </div>
  );
};

export default SearchHeader;
