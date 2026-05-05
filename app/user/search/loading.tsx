import LoadingSpinner from "../../_components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="py-32">
      <LoadingSpinner message="GitHub 유저 분석 중" />
    </div>
  );
}