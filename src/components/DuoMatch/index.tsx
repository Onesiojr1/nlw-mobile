import React, { useState } from "react";
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
    discord: string;
    onCLose: () => void;
}

export function DuoMatch({ discord, onCLose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordUser() {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord Cópiado!', 'Usuário copiado')
        setIsCopping(false);
    }

    return (
        <Modal 
        animationType="fade"
        transparent
        statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onCLose}>
                        <MaterialIcons 
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading 
                        title="Let's play!" 
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24}}
                    />

                    <Text style={styles.label}>
                        Adicione ao discord
                    </Text>

                    <TouchableOpacity 
                        style={styles.discordButton} 
                        onPress={handleCopyDiscordUser}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator /> : discord}
                         </Text>
                    </TouchableOpacity>
                </View>
            </View>
    </Modal>
    )
}
function setState(): [any, any] {
    throw new Error("Function not implemented.");
}

