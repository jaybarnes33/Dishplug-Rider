import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import Modal from "react-native-modal";
import { Package } from "../../types/app";

interface PackageModalProps {
  isVisible: boolean;
  packageData: Package; // Replace 'any' with the actual type of packageData
  onAccept: () => void;
  onClose: () => void;
}

const PackageModal: React.FC<PackageModalProps> = ({
  isVisible,
  packageData,
  onAccept,
  onClose,
}) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isVisible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isVisible && timer === 0) {
      // Automatically close the modal when the timer reaches 0
      clearInterval(interval);
      onClose();
    }

    return () => clearInterval(interval);
  }, [isVisible, timer, onClose]);

  return (
    <Modal isVisible={isVisible}>
      <View className="bg-white  rounded-2xl py-4 px-3">
        <View>
          <Text>
            Package from {packageData?.pickup.name} to{" "}
            {packageData?.dropoff.name}
          </Text>
          {/* Display package details here */}
          <Text>Time remaining: {timer} seconds</Text>
        </View>

        <View className="flex-row justify-center">
          <Button title="Accept" onPress={onAccept} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PackageModal;
