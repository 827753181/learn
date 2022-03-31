import {
    getPreventScrollPassToScreenHandler,
    useSetState,
    useUpdateEffect,
} from "@lk-library/utils";
import { defineComponent } from "vue";
import { onBeforeUnmount } from "vue";
import { isEmpty } from "lodash";

type PropsType = {
    src?: string;
};
export default defineComponent<PropsType>({
    name: "lk-image",
    inheritAttrs: false,
    setup(props, { attrs }) {
        const [state] = useSetState({
            preview: false,
        });
        const { showHandler, hideHandler } =
            getPreventScrollPassToScreenHandler();
        useUpdateEffect(() => {
            state.preview ? showHandler() : hideHandler();
        }, [() => state.preview]);
        onBeforeUnmount(() => {
            if (!isEmpty(attrs.imageViewer) && state.preview) hideHandler();
        });
        return () => {
            const { src, ...passProps } = attrs as PropsType;

            return <img src={src} {...passProps} />;
        };
    },
});
