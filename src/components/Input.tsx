import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  min-width: 220px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Control = styled.input`
  height: 40px;
  padding: 0 ${({ theme }) => theme.space(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...rest }: Props) {
  const inputId = id ?? rest.name ?? 'field';
  return (
    <Field htmlFor={inputId}>
      {label}
      <Control id={inputId} {...rest} />
    </Field>
  );
}
