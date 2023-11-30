import hooks from '../css-hooks';

/**
 * A side bar component with Overlay that works without JavaScript.
 * @example
 * ```jsx
 * <Aside id="search-aside" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  id = 'aside',
}: {
  children?: React.ReactNode;
  heading: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      className="overlay"
      aria-modal
      id={id}
      role="dialog"
      style={hooks({
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: 0,
        left: 0,
        opacity: 0,
        pointerEvents: 'none',
        position: 'fixed',
        right: 0,
        top: 0,
        transition: 'opacity 400ms ease-in-out',
        visibility: 'hidden',
        zIndex: '10',
        border: 0,
        target: {
          opacity: 1,
          pointerEvents: 'auto',
          visibility: 'visible',
        },
      })}
    >
      <button
        style={hooks({
          background: 'transparent',
          border: 'none',
          color: 'transparent',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: 'calc(100% - var(--aside-width))',
        })}
        onClick={() => {
          history.go(-1);
          window.location.hash = '';
        }}
      />
      <aside
        style={hooks({
          background: 'var(--color-light)',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)',
          height: '100vh',
          maxWidth: 'var(--aside-width)',
          minWidth: 'var(--aside-width)',
          position: 'fixed',
          right: 'calc(-1 * var(--aside-width))',
          top: 0,
          transition: 'transform 200ms ease-in-out',
          targetAside: {
            transform: 'translateX(calc(var(--aside-width) * -1))',
          },
        })}
      >
        <header
          style={hooks({
            alignItems: 'center',
            borderBottom: '1px solid var(--color-dark)',
            display: 'flex',
            height: 'var(--header-height)',
            justifyContent: 'space-between',
            padding: '0 20px',
          })}
        >
          <h3 style={{margin: 0}}>{heading}</h3>
          <CloseAside />
        </header>
        <main
          style={hooks({
            margin: '1rem',
            li: {
              marginBottom: '0.125rem',
            },
            p: {
              margin: '0 0 0.25rem',
              lastChild: {
                margin: 0,
              },
            },
          })}
        >
          {children}
        </main>
      </aside>
    </div>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a
      className="close"
      style={hooks({
        fontWeight: 'bold',
        opacity: 0.8,
        textDecoration: 'none',
        transition: 'all 200ms',
        width: '20px',
        hover: {
          opacity: 1,
        },
      })}
      href="#"
      onChange={() => history.go(-1)}
    >
      &times;
    </a>
  );
}
