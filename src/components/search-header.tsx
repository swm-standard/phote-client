'use client';

import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Container from '@/components/container';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/app/(after-login)/(nav)/question/search-input';
import SearchedWords from '@/app/(after-login)/(nav)/question/searched-words';

const SearchHeader = () => {
  const [tags, updateTags] = useImmer<string[]>([]);
  const [keywords, updateKeywords] = useImmer<string[]>([]);
  const searchParams = useSearchParams();

  const { register, getValues, reset } = useForm<{ searchValue: string }>({
    defaultValues: {
      searchValue: '',
    },
  });

  useEffect(() => {
    const readTags = searchParams.get('tags');
    const readKeywords = searchParams.get('keywords');

    readTags && updateTags(() => [...readTags.split(',')]);
    readKeywords && updateKeywords(() => [...readKeywords.split(',')]);
  }, []);

  const deleteWord = (targetWord: string, isTag = false) => {
    isTag
      ? updateTags((draft) => draft.filter((word) => word !== targetWord))
      : updateKeywords((draft) => draft.filter((word) => word !== targetWord));
  };

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== 'Enter') return;

    const searchValue = getValues('searchValue');
    searchValue[0] === '#'
      ? updateTags((draft) => {
          draft.push(searchValue.slice(1));
        })
      : updateKeywords((draft) => {
          draft.push(searchValue);
        });
    reset();
  };

  return (
    <Container className="flex flex-col gap-4">
      <SearchInput
        register={register('searchValue')}
        placeholder="문제 내용과 태그를 검색해주세요."
        onKeyDown={handleEnterPress}
      />
      {tags.length + keywords.length > 0 && (
        <SearchedWords
          tags={tags}
          keywords={keywords}
          deleteWord={deleteWord}
        />
      )}
    </Container>
  );
};

export default SearchHeader;
