import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';

interface StyledProps {
  $variant?: Variant;
  $size?: Size;
  $loading?: boolean;
  $fullWidth?: boolean;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    border-right-color: currentColor;
    opacity: 0.6;
  }
`;

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surface};
      border-color: ${({ theme }) => theme.colors.border};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
    border-color: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
      background: color-mix(in srgb, ${({ theme }) => theme.colors.danger} 82%, ${({ theme }) => theme.colors.text});
      border-color: color-mix(in srgb, ${({ theme }) => theme.colors.danger} 82%, ${({ theme }) => theme.colors.text});
    }
  `,
};

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 ${({ theme }) => theme.space(3)};
    font-size: 14px;
  `,
  md: css`
    height: 40px;
    padding: 0 ${({ theme }) => theme.space(4)};
    font-size: 16px;
  `,
  lg: css`
    height: 48px;
    padding: 0 ${({ theme }) => theme.space(5)};
    font-size: 18px;
  `,
};

const StyledButton = styled.button<StyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading
      ? css`
          cursor: wait;
        `
      : css`
          &:disabled {
            opacity: 0.5;
          }
        `}
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  type = 'button',
  ...rest
}: Props) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      type={type}
      {...rest}
    >
      {loading ? <Spinner aria-hidden="true" /> : null}
      {children}
    </StyledButton>
  );
}
