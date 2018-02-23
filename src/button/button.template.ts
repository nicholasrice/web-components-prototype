export default `
<style id="fwButtonStaticStyles">
    button {
        color: blue;
    }
</style>
<style id="fwButtonDynamicStyles"></style>
<button aria-label="fuck off" class$="[[classes.host]]" on-click="click"><slot></slot></button>
`;
