/* eslint-disable react/prop-types */
import { getEnv } from '../../../utils/appData';
import './CustomComponents.css';

const ALLOWED_TYPES = new Set(['hero', 'text', 'notice', 'button', 'image', 'divider', 'spacer', 'quote', 'feature-list', 'contact', 'hours', 'video']);
const PLUGIN_TEMPLATE_TAGS = new Set(['section', 'article', 'div', 'header', 'footer', 'span', 'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'small', 'ul', 'ol', 'li', 'a', 'img', 'button']);
const PLUGIN_STYLE_PROPERTIES = new Set(['display', 'flexDirection', 'alignItems', 'justifyContent', 'gap', 'gridTemplateColumns', 'width', 'maxWidth', 'minHeight', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'border', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'background', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textAlign', 'textTransform', 'boxShadow', 'opacity', 'objectFit', 'aspectRatio', 'overflow']);

const safeUrl = (value) => {
  const url = String(value || '').trim();
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url) && !/^\/\//.test(url)) return url;
  return '';
};

const mediaUrl = (value) => {
  const url = safeUrl(value);
  if (url.startsWith('/uploads/')) return `${getEnv()}${url}`;
  return url;
};

function ComponentLink({ url, className, children }) {
  const href = safeUrl(url);
  if (!href) return null;
  const external = /^https?:\/\//i.test(href);
  return <a href={href} className={className} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a>;
}

const safePluginStyleValue = (value) => {
  const normalized = String(value ?? '').trim().slice(0, 140);
  return normalized && !/(?:url\s*\(|expression\s*\(|javascript:|[<>{};])/i.test(normalized) ? normalized : '';
};

const nodeStyles = (definition, node, values) => {
  const target = node.slot || '';
  const baseStyles = definition.baseStyles?.[target] || {};
  const styles = Object.entries(baseStyles).reduce((result, [property, value]) => {
    const safeValue = safePluginStyleValue(value);
    if (PLUGIN_STYLE_PROPERTIES.has(property) && safeValue) result[property] = safeValue;
    return result;
  }, {});
  (definition.controls || []).filter((control) => control.section === 'style' && control.target === target).forEach((control) => {
    if (!PLUGIN_STYLE_PROPERTIES.has(control.cssProperty)) return;
    const rawValue = Object.prototype.hasOwnProperty.call(values, control.key) ? values[control.key] : control.default;
    const value = control.unit && Number.isFinite(Number(rawValue)) ? `${Number(rawValue)}${control.unit}` : safePluginStyleValue(rawValue);
    if (value !== '') styles[control.cssProperty] = value;
  });
  return styles;
};

function PluginTemplateNode({ node, definition, values, path }) {
  if (!node || !PLUGIN_TEMPLATE_TAGS.has(node.tag)) return null;
  const Tag = node.tag;
  const boundText = node.bind ? String(values[node.bind] ?? '') : '';
  const className = String(node.className || '').split(/\s+/).filter((item) => /^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(item)).slice(0, 6).join(' ');
  const elementProps = { className: className || undefined, style: nodeStyles(definition, node, values) };
  if (Tag === 'a') {
    const href = safeUrl(values[node.hrefBind]);
    if (href) {
      elementProps.href = href;
      if (/^https?:\/\//i.test(href)) {
        elementProps.target = '_blank';
        elementProps.rel = 'noopener noreferrer';
      }
    }
  }
  if (Tag === 'img') {
    const src = mediaUrl(values[node.srcBind]);
    if (!src) return null;
    elementProps.src = src;
    elementProps.alt = String(values[node.altBind] || '').slice(0, 160);
    elementProps.loading = 'lazy';
  }
  if (Tag === 'button') elementProps.type = 'button';
  const children = (node.children || []).map((child, index) => <PluginTemplateNode key={`${path}-${index}`} node={child} definition={definition} values={values} path={`${path}-${index}`} />);
  return <Tag {...elementProps}>{Tag === 'img' ? null : <>{boundText}{children}</>}</Tag>;
}

function PluginTemplateElement({ component, definition }) {
  if (!definition?.template) return null;
  return <div className="vmenu-custom-component vmenu-plugin-template-element" data-plugin-element={definition.type}>
    <PluginTemplateNode node={definition.template} definition={definition} values={component.props || {}} path="root" />
  </div>;
}

function CustomComponent({ component, pluginDefinition }) {
  if (pluginDefinition) return <PluginTemplateElement component={component} definition={pluginDefinition} />;
  const props = component.props || {};
  const theme = ['default', 'primary', 'soft', 'dark', 'success', 'warning'].includes(props.theme) ? props.theme : 'default';
  const alignment = ['left', 'center', 'right'].includes(props.alignment) ? props.alignment : 'left';
  const classes = `vmenu-custom-component vmenu-component-${component.type} theme-${theme} align-${alignment}`;

  if (component.type === 'hero') {
    return <section className={classes}>
      {props.eyebrow && <span className="vmenu-component-eyebrow">{props.eyebrow}</span>}
      {props.title && <h2>{props.title}</h2>}
      {props.body && <p>{props.body}</p>}
      {props.label && props.url && <ComponentLink url={props.url} className="vmenu-component-button">{props.label}</ComponentLink>}
    </section>;
  }

  if (component.type === 'text' || component.type === 'notice') {
    return <section className={classes}>
      {props.title && <h3>{props.title}</h3>}
      {props.body && <p>{props.body}</p>}
    </section>;
  }

  if (component.type === 'button') {
    const style = ['solid', 'outline', 'subtle'].includes(props.style) ? props.style : 'solid';
    return <div className={`${classes} button-${style}`}>
      <ComponentLink url={props.url} className="vmenu-component-button">{props.label || 'Отвори'}</ComponentLink>
    </div>;
  }

  if (component.type === 'image') {
    const src = mediaUrl(props.imageUrl);
    if (!src) return null;
    const size = ['small', 'medium', 'large'].includes(props.size) ? props.size : 'medium';
    return <figure className={`${classes} image-${size}`}>
      <img src={src} alt={props.alt || ''} loading="lazy" />
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>;
  }

  if (component.type === 'divider') {
    const style = ['solid', 'outline', 'subtle'].includes(props.style) ? props.style : 'subtle';
    return <div className={`${classes} divider-${style}`} role="separator" />;
  }

  if (component.type === 'spacer') {
    const size = ['small', 'medium', 'large'].includes(props.size) ? props.size : 'medium';
    return <div className={`${classes} spacer-${size}`} aria-hidden="true" />;
  }

  if (component.type === 'quote') {
    return <blockquote className={classes}>
      <p>{props.body}</p>
      {props.author && <footer>— {props.author}</footer>}
    </blockquote>;
  }

  if (component.type === 'feature-list') {
    const items = String(props.items || '').split('\n').map((line) => line.trim()).filter(Boolean).slice(0, 12);
    return <section className={classes}>
      {props.title && <h3>{props.title}</h3>}
      <div className="vmenu-feature-grid">{items.map((item, index) => {
        const [title, description] = item.split('|').map((part) => part?.trim());
        return <div className="vmenu-feature-item" key={`${title}-${index}`}><i className="fa-solid fa-check" /><div><strong>{title}</strong>{description && <span>{description}</span>}</div></div>;
      })}</div>
    </section>;
  }

  if (component.type === 'contact') {
    return <section className={classes}>
      {props.title && <h3>{props.title}</h3>}
      <div className="vmenu-contact-list">
        {props.phone && <a href={`tel:${String(props.phone).replace(/[^+0-9]/g, '')}`}><i className="fa-solid fa-phone" />{props.phone}</a>}
        {props.email && <a href={`mailto:${props.email}`}><i className="fa-solid fa-envelope" />{props.email}</a>}
        {props.address && <span><i className="fa-solid fa-location-dot" />{props.address}</span>}
      </div>
    </section>;
  }

  if (component.type === 'hours') {
    return <section className={classes}>{props.title && <h3>{props.title}</h3>}<p>{props.body}</p></section>;
  }

  if (component.type === 'video') {
    const url = safeUrl(props.videoUrl);
    if (!url) return null;
    const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const embedUrl = youtube ? `https://www.youtube-nocookie.com/embed/${youtube[1]}` : (vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null);
    return <figure className={classes}>
      {props.title && <h3>{props.title}</h3>}
      <div className="vmenu-video-shell">{embedUrl
        ? <iframe src={embedUrl} title={props.title || 'Video'} loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        : <video src={url} controls preload="metadata" />
      }</div>
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>;
  }

  return null;
}

export default function CustomComponents({ objectData, placement = 'before-menu', pageKey = 'home' }) {
  const builder = objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.COMPONENT_BUILDER;
  if (!builder?.enabled || !Array.isArray(builder.components)) return null;
  const pluginElements = new Map((objectData?.installedPlugins || []).flatMap((plugin) => plugin?.themeBuilderElements || []).map((element) => [element.type, element]));

  const components = builder.components.filter((component) => (
    component?.enabled !== false
      && component.position === placement
      && (ALLOWED_TYPES.has(component.type) || pluginElements.has(component.type))
      && (component.pages?.includes('all') || (component.pages || ['home']).includes(pageKey))
  ));
  if (!components.length) return null;

  const previewMode = new URLSearchParams(window.location.search).get('preview') === '1'
    || sessionStorage.getItem('vmenuPreviewMode') === '1';
  const selectInEditor = (event, componentId) => {
    if (!previewMode || window.parent === window) return;
    event.preventDefault();
    event.stopPropagation();
    let targetOrigin = '*';
    try { targetOrigin = new URL(document.referrer).origin; } catch { /* preview still works without a referrer */ }
    window.parent.postMessage({ type: 'VMENU_PREVIEW_SELECT', componentId }, targetOrigin);
  };

  return <div className={`vmenu-custom-components placement-${placement}`}>
    {components.map((component) => <div
      key={component.id}
      className={previewMode ? 'vmenu-preview-selectable' : undefined}
      onClickCapture={(event) => selectInEditor(event, component.id)}
      title={previewMode ? 'Кликнете за редакция' : undefined}
    ><CustomComponent component={component} pluginDefinition={pluginElements.get(component.type)} /></div>)}
  </div>;
}
