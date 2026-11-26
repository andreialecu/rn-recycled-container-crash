import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const SHADOW = '0px 2px 6px rgba(0,0,0,0.4)';
const FILL = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;

export default function App() {
  const [step, setStep] = useState(1);
  const [width, setWidth] = useState(0);
  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 80 }}>
      <Text onPress={() => setStep(step + 1)} style={{ fontSize: 18, padding: 12, backgroundColor: '#c88' }} testID="next">
        {['', '1. Swap the views', '2. Hide the green pill (crashes)', 'Done'][step]}
      </Text>
      {step === 1 ? (
        // A view that clips and has a box shadow: RCTViewComponentView gives it a container view.
        <View key="clipped" style={{ height: 40, boxShadow: SHADOW, overflow: 'hidden' }} />
      ) : (
        // A Pressable with a box shadow that doesn't clip reuses the recycled view.
        <Pressable key="pressable" onLayout={e => setWidth(e.nativeEvent.layout.width)} style={{ height: 40, boxShadow: SHADOW }}>
          <View style={[FILL, { backgroundColor: '#333' }]} />
          {width > 0 && step === 2 ? <View style={{ ...FILL, right: width / 2, backgroundColor: '#5a5' }} /> : null}
        </Pressable>
      )}
    </View>
  );
}
