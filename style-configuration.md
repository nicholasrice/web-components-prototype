# Components and leaf nodes
When a component gets added to the DOM, it needs to know what it's specific style configuration is. When a component mounts, it can dispatch a mount event. Design language providers could listen for mount events and alter the payload with that providers config overrides. At the end of the capture phase, the even returns to the event emitter with all configuration values and the component can safely be rendered.

