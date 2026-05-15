import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
  variant?: "default" | "destructive";
};

const ConfirmDialog = ({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  trigger,
  variant = "default",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
<AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

<AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface rounded-xl p-6 shadow-lg w-[400px]">          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-muted-foreground mt-2">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-2 mt-6">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">{cancelText}</Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button
                variant={variant === "destructive" ? "destructive" : "default"}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDialog;