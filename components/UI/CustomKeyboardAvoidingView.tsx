import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../colors/globalColors';
import { useHeaderHeight } from '@react-navigation/elements';

const CustomKeyboardAvoidingView = (props: { children: React.ReactNode }) => {
    const headerHeight = useHeaderHeight();
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.primary800,
            }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={headerHeight}
                behavior='position'
            >
                {props.children}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default CustomKeyboardAvoidingView;
