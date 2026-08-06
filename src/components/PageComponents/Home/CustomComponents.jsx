/* eslint-disable react/prop-types */
import { getEnv } from '../../../utils/appData';
import './CustomComponents.css';

const ALLOWED_TYPES = new Set(['hero', 'text', 'notice', 'button', 'image', 'divider', 'spacer', 'quote', 'feature-list', 'contact', 'hours', 'video']);

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

function CustomComponent({ component }) {
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

  const components = builder.components.filter((component) => (
    component?.enabled !== false
      && component.position === placement
      && ALLOWED_TYPES.has(component.type)
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
    ><CustomComponent component={component} /></div>)}
  </div>;
}
