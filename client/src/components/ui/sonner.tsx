import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-[#ffffff] !text-[#111827] !border !border-[#d8e1ea] !shadow-lg !rounded-lg",
          description: "!text-[#64748b]",
          actionButton:
            "!bg-[#0f766e] !text-white hover:!bg-[#115e59] !rounded-md",
          cancelButton:
            "!bg-[#e8eef3] !text-[#1f2937] hover:!bg-[#d8e1ea] !rounded-md",
          closeButton:
            "!border-[#d8e1ea] !bg-[#ffffff] !text-[#111827] hover:!bg-[#edf2f7]",
          success: "!bg-[#ffffff] !text-[#111827] !border-[#d8e1ea]",
          error: "!bg-[#ffffff] !text-[#111827] !border-[#d8e1ea]",
          warning: "!bg-[#ffffff] !text-[#111827] !border-[#d8e1ea]",
          info: "!bg-[#ffffff] !text-[#111827] !border-[#d8e1ea]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
