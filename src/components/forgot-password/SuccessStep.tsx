import { useNavigate } from "react-router"
import { StepIcon } from "./StepIcon"
import { SubmitButton } from "./SubmitButton"

const INTER = "'Inter', sans-serif"

export function SuccessStep() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <StepIcon variant="success" />

      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: 22,
            color: "var(--page-text)",
            marginBottom: 6,
          }}
        >
          PIN Reset!
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13.5,
            color: "var(--page-text-muted)",
            lineHeight: "20px",
          }}
          className="px-2"
        >
          Your access PIN has been successfully reset. You can now log in using
          your new PIN.
        </p>
      </div>

      <SubmitButton
        onClick={() => navigate("/login")}
        disabled={false}
        isLoading={false}
        label="Back to Sign In"
      />
    </div>
  )
}
