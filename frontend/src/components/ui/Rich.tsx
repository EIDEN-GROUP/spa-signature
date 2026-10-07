import { Fragment } from 'react'

/**
 * A line of text from the dictionary, with its two marks read:
 * *stars* around the words a title leans on, and a line break kept as one.
 */
export function Rich({ text }: { text: string }) {
  return text.split('\n').map((line, row) => (
    <Fragment key={row}>
      {row > 0 ? (
        <>
          {' '}
          <br />
        </>
      ) : null}
      {line.split('*').map((part, index) => (index % 2 ? <em key={index}>{part}</em> : part))}
    </Fragment>
  ))
}
