import React, { useEffect } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { lineClamp } from 'src/styles';
import { getEscapedString } from 'src/utils/highlight';
import { BreakPoint, greaterThanOrEqualTo, orBelow } from 'src/utils/mediaQuery';
import {
  slateGray50, slateGray5, lightSteelBlue5, gray100,
} from '@ridi/colors';
import { ADULT_BADGE_URL, AUTHOR_ICON_URL } from 'src/constants/icons';

import {
  AuthorInfo as AuthorInfoScheme,
  InstantSearchAuthorResultScheme,
  InstantSearchBookResultScheme,
  InstantSearchResultScheme,
} from './InstantSearch';

const listItemCSS = css`
  ${orBelow(
    BreakPoint.LG,
    css`
      min-height: 40px;
    `,
  )};
  cursor: pointer;
`;

const BookListItem = styled.li`
  ${listItemCSS}
  ${orBelow(
    BreakPoint.LG,
    css`
      :hover {
        background-color: white !important;
      }
      :focus {
        background-color: white !important;
      }
    `,
  )}
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
        :first-of-type {
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }
        :last-of-type {
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        :hover {
          background-color: ${lightSteelBlue5};
        }
      `,
  )}
    :hover {
    background-color: ${lightSteelBlue5};
  }
  button {
    :focus {
      background-color: ${lightSteelBlue5};
      outline: none !important;
    }
  }
`;

const AuthorListItem = styled.li`
  ${listItemCSS};
  display: flex;
  ${orBelow(
    BreakPoint.LG,
    css`
      :hover {
        background-color: white !important;
      }
      :focus {
        background-color: white !important;
      }
    `,
  )};
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      :first-of-type {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
    `,
  )};
  :hover {
    background-color: ${lightSteelBlue5};
  }
  button {
    :focus {
      background-color: ${lightSteelBlue5};
      outline: none !important;
    }
  }
`;

const AuthorListItemButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 13px 16px;
  text-align: left;
  flex-wrap: wrap;
`;

const BookListItemButton = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  padding: 12px 16px;
  align-items: center;
`;
const BookTitle = styled.span`
  font-size: 15px;
  line-height: 1.4em;
  word-break: keep-all;
  margin-right: 6px;
  color: ${gray100};
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      max-width: 298px;
    `,
  )};
`;

const authorPublisherCSS = css`
  line-height: 1.4em;
  color: ${slateGray50};
  -webkit-font-smoothing: antialiased;
  max-width: 298px;
`;

const AuthorInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AuthorName = styled.span`
  font-size: 15px;
  line-height: 1.4em;
  flex-shrink: 0;
  margin-right: 8px;
  ${orBelow(
    BreakPoint.LG,
    css`
      margin-right: 6px;
    `,
  )};
  color: ${gray100};
`;

const AuthorBooksInfo = styled.span`
  font-size: 15px;
  word-break: keep-all;
  color: ${slateGray50};
  ${lineClamp(1)};
`;

const Author = styled.span`
  ${authorPublisherCSS};
  font-size: 15px;
  margin-right: 5px;
`;

const AuthorPublisher = styled.span`
  ${authorPublisherCSS};
  font-size: 13px;
  padding-left: 5px;
  margin-right: 5px;
  ${greaterThanOrEqualTo(
    BreakPoint.LG + 1,
    css`
      max-width: 298px;
    `,
  )}
`;

const InstantSearchDivider = styled.hr`
  height: 1px;
  border: 0;
  border-top: 1px solid #e6e8e0;
  margin: 8px 16px;
  display: block;
`;

const AuthorIconWrapper = styled.span`
  width: 22px;
  height: 22px;
  margin-right: 6px;
  background: ${slateGray5};
  border-radius: 22px;
`;

const AuthorIcon = styled.img`
  padding: 5px;
`;

function AuthorSymbol() {
  return (
    <AuthorIconWrapper>
      <AuthorIcon src={AUTHOR_ICON_URL} alt="작가" />
    </AuthorIconWrapper>
  );
}

const Divider = styled.div`
  height: 12px;
  width: 1px;
  background: #e6e8e0;
`;

interface InstantSearchResultProps {
  result: InstantSearchResultScheme;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleClickAuthorItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickBookItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  focusedPosition: number;
}

interface InstantSearchResultBookListProps {
  result: InstantSearchResultScheme;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleClickBookItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuthorInfo: React.FC<{ author: InstantSearchAuthorResultScheme }> = (props) => {
  const { author } = props;

  return (
    <AuthorInfoWrapper>
      <AuthorSymbol />
      <AuthorName
        dangerouslySetInnerHTML={{
          __html: getEscapedString(author.highlight.name || author.name),
        }}
      />
      <AuthorBooksInfo>
        {`<${author.popular_book_title}>`}
        {author.book_count > 1 ? ` 외 ${author.book_count - 1}권` : ''}
      </AuthorBooksInfo>
    </AuthorInfoWrapper>
  );
};

// Todo 사용 컴포넌트마다 다른 options 사용해서 보여주기
const AuthorLabel: React.FC<{ author: string; authors: AuthorInfoScheme[] }> = (props) => {
  const viewedAuthors = props.authors
    && props.authors
      .filter((author) => author.role === 'author' || author.role === 'illustrator')
      .map((author) => author.name);
  if (!viewedAuthors || viewedAuthors.length === 0) {
    return <Author>{props.author}</Author>;
  }

  return (
    <Author>
      {viewedAuthors.length > 2
        ? `${viewedAuthors[0]} 외 ${viewedAuthors.length - 1}명`
        : `${viewedAuthors.join(', ')}`}
    </Author>
  );
};

const BookList: React.FC<InstantSearchResultBookListProps> = React.memo((props) => {
  const { result, handleKeyDown, handleClickBookItem } = props;
  return (
    <ul>
      {result.books.map((book: InstantSearchBookResultScheme, index) => (
        <BookListItem data-book-id={book.b_id} key={index}>
          <BookListItemButton
            type="button"
            data-book-id={book.b_id}
            onKeyDown={handleKeyDown}
            onClick={handleClickBookItem}
          >
            <BookTitle
              dangerouslySetInnerHTML={{
                __html: getEscapedString(
                  book.highlight.web_title_title || book.web_title_title,
                ),
              }}
            />
            <AuthorLabel author={book.author} authors={book.authors_info} />
            <Divider />
            <AuthorPublisher>{book.publisher}</AuthorPublisher>
            {/* 성인 배지는 검색 반응형 완전 적용 이후에 표시하기로 결정  */}
            {false && book.age_limit > 18 && (
              <img width={19} src={ADULT_BADGE_URL} alt="성인 전용 도서" />
            )}
          </BookListItemButton>
        </BookListItem>
      ))}
    </ul>
  );
});

const ResultWrapper = styled.div`
  padding: 4px 0;
`;

const InstantSearchResult: React.FC<InstantSearchResultProps> = React.memo((props) => {
  const {
    focusedPosition,
    handleClickAuthorItem,
    handleClickBookItem,
    result,
    handleKeyDown,
  } = props;
  const wrapperRef = React.useRef<HTMLDivElement>();
  useEffect(() => {
    if (wrapperRef.current && !!focusedPosition) {
      const items = wrapperRef.current.querySelectorAll('li button');
      if (items.length > 0 && focusedPosition !== 0) {
        const item = items[focusedPosition - 1] as HTMLLIElement;
        if (item) {
          item.focus();
        }
      }
    }
  }, [focusedPosition, result]);

  return (
    <ResultWrapper ref={wrapperRef}>
      {result.authors.length > 0 && (
        <>
          <ul>
            {result.authors.map((author, index) => (
              <AuthorListItem key={index}>
                <AuthorListItemButton
                  type="button"
                  data-author-id={author.id}
                  onKeyDown={handleKeyDown}
                  onClick={handleClickAuthorItem}
                >
                  <AuthorInfo author={author} />
                </AuthorListItemButton>
              </AuthorListItem>
            ))}
          </ul>
          <InstantSearchDivider />
        </>
      )}
      {result.books.length > 0 && (
        <BookList
          handleClickBookItem={handleClickBookItem}
          handleKeyDown={handleKeyDown}
          result={result}
        />
      )}
    </ResultWrapper>
  );
});

export default InstantSearchResult;
