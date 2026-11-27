import { Component } from 'react';

// If a lazy chunk fails or WebGL throws, show the 2D fallback instead of crashing the page.
export default class SafeBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(err) {
    console.warn('3D scene unavailable, showing fallback:', err);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
