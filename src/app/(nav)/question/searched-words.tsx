import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const SearchedWord = ({
  word,
  isTag = false,
  deleteWord,
}: {
  word: string;
  isTag?: boolean;
  deleteWord: (targetWord: string, isTag?: boolean) => void;
}) => {
  const handleDeleteWordClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    deleteWord(word, isTag);
  };

  return (
    <div>
      {isTag ? '#' : ''}
      {word}
      <button onClick={handleDeleteWordClick}>X</button>
    </div>
  );
};

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
    <div className="flex gap-4">
      {tags.map((tag, idx) => (
        <SearchedWord key={idx} word={tag} isTag deleteWord={deleteWord} />
      ))}
      {keywords.map((keyword, idx) => (
        <SearchedWord key={idx} word={keyword} deleteWord={deleteWord} />
      ))}
    </div>
  );
};

export default SearchedWords;
