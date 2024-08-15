'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/container';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import SearchInput from '@/app/(after-login)/(nav)/question/search-input';
import SearchedWords from '@/app/(after-login)/(nav)/question/searched-words';

const SearchHeader = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const { register, getValues, reset } = useForm<{ searchValue: string }>({
    defaultValues: {
      searchValue: '',
    },
  });

  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   const readTags = searchParams.get('tags');
  //   const readKeywords = searchParams.get('keywords');
  //
  //   readTags && updateTags(() => [...readTags.split(',')]);
  //   readKeywords && updateKeywords(() => [...readKeywords.split(',')]);
  // }, []);

  const deleteWord = (targetWord: string, isTag = false) => {
    isTag
      ? setTags((prev) => prev.filter((word) => word !== targetWord))
      : setKeywords((prev) => prev.filter((word) => word !== targetWord));
  };

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== 'Enter') return;

    const searchValue = getValues('searchValue');
    searchValue[0] === '#'
      ? setTags([...tags, searchValue.slice(1)])
      : setKeywords([...keywords, searchValue]);
    reset();
  };

  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
    if (tags.length >= 1) params.set('tags', tags.join(','));
    else params.delete('tags');

    if (keywords.length >= 1) params.set('keywords', keywords.join(','));
    else params.delete('keywords');

    replace(`${pathname}?${params.toString()}`);
  }, [tags, keywords]);

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
