import React from 'react';

const Tag = ({
  tag,
  isTag = false,
  removeTag,
}: {
  tag: string;
  isTag?: boolean;
  removeTag: () => void;
}) => {
  return (
    <button onClick={() => removeTag()}>
      <div className="flex items-center gap-1 rounded-lg bg-brand-blue-heavy px-2 text-white">
        <p className="text-sm font-normal">{`${isTag ? '# ' : ''}${tag}`}</p>
        <p>x</p>
      </div>
    </button>
  );
};

export default Tag;
