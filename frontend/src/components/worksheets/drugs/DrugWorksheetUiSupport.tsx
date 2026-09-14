import React from "react";
import Toast from "../../shared/Toast";

interface DrugWorksheetUiSupportProps {
  showToast: boolean;
  toastMessage: string;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrugWorksheetUiSupport: React.FC<DrugWorksheetUiSupportProps> = ({
  showToast,
  toastMessage,
  setShowToast,
}) => {
  return (
    <>
      <Toast
        isVisible={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />
      <style>{`
        .prep-rich-content, .prep-rich-content * {
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .prep-rich-content p {
          margin: 0 0 0.25rem 0 !important;
          padding: 0 !important;
        }
        .prep-rich-content ul, .prep-rich-content ol {
          margin: 0 !important;
          padding-left: 1.25rem !important;
        }
        .blank-method-content, .blank-method-content * {
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .blank-method-content p {
          margin: 0 0 0.25rem 0 !important;
          padding: 0 !important;
        }
        .ws-prose-reset, .ws-prose-reset * {
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .ws-prose-reset p {
          margin: 0 0 0.25rem 0 !important;
          padding: 0 !important;
        }
        .ws-prose-reset ul, .ws-prose-reset ol {
          margin: 0 !important;
          padding-left: 1.25rem !important;
        }
      `}</style>


    </>
  );
};

export default DrugWorksheetUiSupport;
