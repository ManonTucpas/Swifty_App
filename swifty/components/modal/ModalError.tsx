import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Heading } from "../ui/heading";
import { Text } from "@/components/ui/text";
import { CloseIcon, Icon } from "../ui/icon";

type ModalErrorProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  errorMessage: string;
};

export function ModalError(props: ModalErrorProps) {
  return (
    <Modal isOpen={props.showModal}
      onClose={() => {
        props.setShowModal(false)
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Error
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="lg"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" className="text-typography-500">
            {props.errorMessage}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}