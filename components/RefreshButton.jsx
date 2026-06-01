"use client";

export default function RefreshButton() {
  return (
    <button type="button" onClick={() => window.location.reload()}>
      새로고침
    </button>
  );
}
