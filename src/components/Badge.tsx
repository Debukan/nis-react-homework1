import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Tone = 'accent' | 'neutral';

const StyledBadge = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;

  ${({ theme, $tone }) =>
    $tone === 'accent'
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};
        `
      : css`
          background: ${theme.colors.bg};
          color: ${theme.colors.muted};
          border: 1px solid ${theme.colors.border};
        `}
`;

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <StyledBadge $tone={tone}>{children}</StyledBadge>;
}
