/* eslint-disable react/prop-types */
import { getEnv } from '../../utils/appData';
import './plugin-components.css';

const safeAssetUrl = (value) => {
  const url = String(value || '').trim();
  return /^\/uploads\/[A-Za-z0-9._-]+$/.test(url) ? `${getEnv()}${url}` : '';
};

function PluginComponent({ plugin, component }) {
  const iconUrl = safeAssetUrl(plugin.iconUrl);
  const style = component.color ? { '--vmenu-plugin-accent': component.color } : undefined;
  return <article className={`vmenu-plugin-component type-${component.type || 'card'}`} style={style}>
    <span className="vmenu-plugin-component-icon" aria-hidden="true">
      {iconUrl ? <img src={iconUrl} alt="" /> : <span>✦</span>}
    </span>
    <div className="vmenu-plugin-component-copy">
      {component.title && <strong>{component.title}</strong>}
      {component.value && <b>{component.value}</b>}
      {component.text && <p>{component.text}</p>}
      <small>Добавено от {plugin.name}</small>
    </div>
    {component.actionLabel && /^\/(?!\/)/.test(component.actionHref || '') && <a href={component.actionHref}>{component.actionLabel}</a>}
  </article>;
}

export default function PluginComponentSlot({ plugins, pageKey, slot }) {
  const entries = (Array.isArray(plugins) ? plugins : []).flatMap((plugin) =>
    (Array.isArray(plugin.components) ? plugin.components : [])
      .filter((component) => component.slot === slot && (component.target === 'all' || component.target === pageKey))
      .map((component) => ({ plugin, component })),
  );
  if (!entries.length) return null;
  return <section className={`vmenu-plugin-component-slot slot-${slot}`} aria-label="Допълнения към менюто">
    {entries.map(({ plugin, component }) => <PluginComponent key={`${plugin.id}-${component.id}`} plugin={plugin} component={component} />)}
  </section>;
}
