'use client';

import React, { useEffect, useState } from 'react';
import CtrlTextInput from '@/components/custom/ctrl-text-input';
import { useImmer } from 'use-immer';
import SearchedWords from '@/app/(nav)/question/searched-words';
import { useSearchParams } from '@storybook/nextjs/navigation.mock';

const SearchHeader = ({
  searchedQuestionNumber,
}: {
  searchedQuestionNumber: number;
}) => {
  const [tags, updateTags] = useImmer<string[]>([]);
  const [keywords, updateKeywords] = useImmer<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const readTags = searchParams.get('tags');
    const readKeywords = searchParams.get('keywords');

    readTags && updateTags(() => [...readTags.split(',')]);
    readKeywords && updateKeywords(() => [...readKeywords.split(',')]);
  }, []);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchValue(e.target.value);
  };

  const deleteWord = (targetWord: string, isTag = false) => {
    isTag
      ? updateTags((draft) => draft.filter((word) => word !== targetWord))
      : updateKeywords((draft) => draft.filter((word) => word !== targetWord));
  };

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== 'Enter') return;
    // 입력 예외처리 필요

    searchValue[0] === '#'
      ? updateTags((draft) => {
          draft.push(searchValue.slice(1));
        })
      : updateKeywords((draft) => {
          draft.push(searchValue);
        });
    setSearchValue('');
  };

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
