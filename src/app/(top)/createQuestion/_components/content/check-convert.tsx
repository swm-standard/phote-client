import React from 'react';

const CheckConvert = () => {
  return (
    <form>
      <fieldset>
        <legend>문제설명</legend>
        <textarea></textarea>
      </fieldset>
      <fieldset>
        <legend>문제그림</legend>
        <input type="file" />
      </fieldset>
      <fieldset>
        <legend>문제 유형</legend>
        <label>
          <input type="radio" name="option" value="객관식" />
          객관식
        </label>
        <label>
          <input type="radio" name="option" value="단답형" />
          단답형
        </label>
      </fieldset>
      <fieldset>
        <legend>선택지</legend>
        <ul>
          <li>
            <input value="선택지1" />
          </li>
          <li>
            <input value="선택지2" />
          </li>
          <li>
            <input value="선택지3" />
          </li>
          <li>
            <input value="선택지4" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default CheckConvert;
