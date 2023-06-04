import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { sendPostRequest, useAllPlans } from "@/utils/helpers";
import { addWorkoutDays } from "@/utils/helpers";
import useSWRMutation from "swr/mutation";
import { TemplateName as Info } from "@/pages/dashboard";

const FormCreatePlan = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;

  & > button {
    width: fit-content;
    margin-top: 25px;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
  }

  & > label,
  input {
    font-size: 1.5rem;
  }

  & > input {
    padding: 5px;
    text-indent: 10px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
`;

const createFormButton = css`
  padding: 0.45rem 1.75rem;
  font-size: 1.2rem;
  border-radius: 3px;
`;

const SaveButton = styled.button`
  ${createFormButton}
  border: none;
  background-color: var(--soft-green);
`;

const BackButton = styled.button`
  ${createFormButton}
  border: none;
  background-color: var(--cancel-red);
  color: var(--lightest-blue);
`;

export default function PlanForm() {
  const router = useRouter();
  const { data } = useAllPlans();
  const { trigger } = useSWRMutation("/api/plans", sendPostRequest, {
    onSuccess: (id) => router.push(`viewPlans/${id}`),
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    inputData.days = Number(inputData.days);
    inputData.routine = addWorkoutDays(inputData.days);

    if (data.length === 0) {
      inputData.isCurrent = true;
    } else {
      inputData.isCurrent = false;
    }

    inputData.logs = [];
    inputData.sessions = [];

    trigger(inputData);
  };

  return (
    <>
      <Info>Create Template</Info>
      <FormCreatePlan onSubmit={handleFormSubmit} autoComplete="off">
        <label htmlFor="name">Template Name</label>
        <input
          type="text"
          id="name"
          name="name"
          minLength={2}
          maxLength={20}
          required
        />
        <label htmlFor="days">Number of Workout Days</label>
        <input type="number" id="days" name="days" min={1} max={7} required />

        <ButtonContainer>
          <SaveButton type="submit">Save</SaveButton>
          <BackButton type="button" onClick={() => router.push("/")}>
            Back
          </BackButton>
        </ButtonContainer>
      </FormCreatePlan>
    </>
  );
}
