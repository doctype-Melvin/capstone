import styled from "styled-components";
import { useRouter } from "next/router";
import { sendPostRequest } from "@/utils/helpers";
import { addWorkoutDays, workoutWeek } from "@/utils/helpers";
import useSWRMutation from "swr/mutation";

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
`;

export default function PlanForm() {
  const router = useRouter();

  const { trigger } = useSWRMutation("/api/plans", sendPostRequest, {
    onSuccess: (id) => router.push(`viewPlans/${id}`),
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);
    inputData.days = Number(inputData.days);
    inputData.routine = addWorkoutDays(inputData.days);
    inputData.isCurrent = false;
    inputData.logs = [workoutWeek];

    trigger(inputData);
  };

  return (
    <FormCreatePlan onSubmit={handleFormSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" minLength={2} maxLength={20} required />
      <label htmlFor="days">Days</label>
      <input type="number" name="days" min={1} max={7} required />
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.push("/")}>
        Back
      </button>
    </FormCreatePlan>
  );
}
