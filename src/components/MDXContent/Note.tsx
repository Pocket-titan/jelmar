import type { ComponentType, PropsWithChildren } from "react";
import styled from "styled-components";
import {
  LuInfo as Info,
  LuAlertTriangle as Warning,
  LuCheckCircle as Success,
  LuXOctagon as Danger,
} from "react-icons/lu";
import { FaChevronDown as ChevronDown } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { TRANSITION_DURATION } from "src/ts/theme";

export type NoteType = "info" | "warning" | "danger" | "success";

const Note = ({
  type = "info",
  title,
  children,
}: PropsWithChildren<{ type?: NoteType; title?: string }>) => {
  let Component: ComponentType<PropsWithChildren<{ className?: string }>>;
  let Icon: IconType;

  switch (type) {
    case "info":
      Component = InfoNote;
      Icon = Info;
      break;
    case "warning":
      Component = WarningNote;
      Icon = Warning;
      break;
    case "danger":
      Component = DangerNote;
      Icon = Danger;
      break;
    case "success":
      Component = SuccessNote;
      Icon = Success;
      break;
  }

  return (
    <Component className={`note-${type}`}>
      <IconWrapper>
        <Icon size={32} />
      </IconWrapper>
      {title && <Title>{title}</Title>}
      <Content>{children}</Content>
    </Component>
  );
};

export const BaseWrapper = styled.aside`
  position: relative;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  font-size: 1rem;
  margin-top: 48px;
  margin-bottom: 64px;
  border-left: 3px solid;
  border-radius: 4px;
  transition: background ${TRANSITION_DURATION}ms ease 0s;

  @media ${(p) => p.theme.breakpoints?.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -12px;
    margin-right: -12px;
    border-radius: 2px;
  }

  @media (min-width: 686px) {
    margin-left: -32px;
    margin-right: -32px;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`;

export const InfoNote = styled(BaseWrapper)`
  background: var(--color-info-background);
  border-color: var(--color-info);
`;

export const SuccessNote = styled(BaseWrapper)`
  background: var(--color-success-background);
  border-color: var(--color-success);
`;

export const WarningNote = styled(BaseWrapper)`
  background: var(--color-warning-background);
  border-color: var(--color-warning);
`;

export const DangerNote = styled(BaseWrapper)`
  background: var(--color-danger-background);
  border-color: var(--color-danger);
`;

const Title = styled.strong`
  display: block;
  font-size: calc(17 / 16 * 1rem);
  margin-bottom: 8px;
  font-weight: var(--font-weight-bold);
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(calc(-50% - 1.5px), -50%);
  padding: 8px;
  background: var(--color-background);
  border-radius: 50%;
  transition: background ${TRANSITION_DURATION}ms ease 0s;

  @media ${(p) => p.theme.breakpoints?.mdAndSmaller} {
    display: none;
  }

  svg {
    display: block;
  }

  .note-info & {
    color: var(--color-info);
  }

  .note-success & {
    color: var(--color-success);
  }

  .note-warning & {
    color: var(--color-warning);
    border-radius: 25% 25%;
    left: -1.5px;
  }

  .note-danger & {
    color: var(--color-danger);
    /* border-radius: 45% 45%; */
    left: -1.5px;
  }
`;

const Content = styled.div`
  /* TODO: Figure out why 'max-width: 100%' doesn't work */
  max-width: calc(100vw - 98px);

  @media ${(p) => p.theme.breakpoints?.smAndSmaller} {
    max-width: calc(100vw - 40px);
  }
`;

export default Note;
