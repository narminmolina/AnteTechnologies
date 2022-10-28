'undefined' != typeof navigator &&
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(function () {
          return e(t);
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t))
      : ((t.lottie = e(t)), (t.bodymovin = t.lottie));
  })(window || {}, function (window) {
    'use strict';
    function ProjectInterface() {
      return {};
    }
    function roundValues(t) {
      bm_rnd = t
        ? Math.round
        : function (t) {
            return t;
          };
    }
    function styleDiv(t) {
      (t.style.position = 'absolute'),
        (t.style.top = 0),
        (t.style.left = 0),
        (t.style.display = 'block'),
        (t.style.transformOrigin = t.style.webkitTransformOrigin = '0 0'),
        (t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = 'visible'),
        (t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = 'preserve-3d');
    }
    function BMEnterFrameEvent(t, e, r, i) {
      (this.type = t), (this.currentTime = e), (this.totalTime = r), (this.direction = i < 0 ? -1 : 1);
    }
    function BMCompleteEvent(t, e) {
      (this.type = t), (this.direction = e < 0 ? -1 : 1);
    }
    function BMCompleteLoopEvent(t, e, r, i) {
      (this.type = t), (this.currentLoop = r), (this.totalLoops = e), (this.direction = i < 0 ? -1 : 1);
    }
    function BMSegmentStartEvent(t, e, r) {
      (this.type = t), (this.firstFrame = e), (this.totalFrames = r);
    }
    function BMDestroyEvent(t, e) {
      (this.type = t), (this.target = e);
    }
    function randomString(t, e) {
      void 0 === e && (e = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
      var r,
        i = '';
      for (r = t; r > 0; --r) i += e[Math.round(Math.random() * (e.length - 1))];
      return i;
    }
    function HSVtoRGB(t, e, r) {
      var i, s, a, n, o, h, l, p;
      switch (((n = Math.floor(6 * t)), (o = 6 * t - n), (h = r * (1 - e)), (l = r * (1 - o * e)), (p = r * (1 - (1 - o) * e)), n % 6)) {
        case 0:
          (i = r), (s = p), (a = h);
          break;
        case 1:
          (i = l), (s = r), (a = h);
          break;
        case 2:
          (i = h), (s = r), (a = p);
          break;
        case 3:
          (i = h), (s = l), (a = r);
          break;
        case 4:
          (i = p), (s = h), (a = r);
          break;
        case 5:
          (i = r), (s = h), (a = l);
      }
      return [i, s, a];
    }
    function RGBtoHSV(t, e, r) {
      var i,
        s = Math.max(t, e, r),
        a = Math.min(t, e, r),
        n = s - a,
        o = 0 === s ? 0 : n / s,
        h = s / 255;
      switch (s) {
        case a:
          i = 0;
          break;
        case t:
          (i = e - r + n * (e < r ? 6 : 0)), (i /= 6 * n);
          break;
        case e:
          (i = r - t + 2 * n), (i /= 6 * n);
          break;
        case r:
          (i = t - e + 4 * n), (i /= 6 * n);
      }
      return [i, o, h];
    }
    function addSaturationToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (r[1] += e), r[1] > 1 ? (r[1] = 1) : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
    }
    function addBrightnessToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (r[2] += e), r[2] > 1 ? (r[2] = 1) : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
    }
    function addHueToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (r[0] += e / 360), r[0] > 1 ? (r[0] -= 1) : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
    }
    function BaseEvent() {}
    function createSizedArray(t) {
      return Array.apply(null, { length: t });
    }
    function createNS(t) {
      return document.createElementNS(svgNS, t);
    }
    function createTag(t) {
      return document.createElement(t);
    }
    function DynamicPropertyContainer() {}
    function extendPrototype(t, e) {
      var r,
        i,
        s = t.length;
      for (r = 0; r < s; r += 1) {
        i = t[r].prototype;
        for (var a in i) i.hasOwnProperty(a) && (e.prototype[a] = i[a]);
      }
    }
    function getDescriptor(t, e) {
      return Object.getOwnPropertyDescriptor(t, e);
    }
    function createProxyFunction(t) {
      function e() {}
      return (e.prototype = t), e;
    }
    function bezFunction() {
      function t(t, e, r, i, s, a) {
        var n = t * i + e * s + r * a - s * i - a * t - r * e;
        return n > -0.001 && n < 0.001;
      }
      function e(e, r, i, s, a, n, o, h, l) {
        if (0 === i && 0 === n && 0 === l) return t(e, r, s, a, o, h);
        var p,
          f = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - r, 2) + Math.pow(n - i, 2)),
          m = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)),
          c = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
        return (p = f > m ? (f > c ? f - m - c : c - m - f) : c > m ? c - m - f : m - f - c), p > -1e-4 && p < 1e-4;
      }
      function r(t) {
        var e,
          r = segments_length_pool.newElement(),
          i = t.c,
          s = t.v,
          a = t.o,
          n = t.i,
          o = t._length,
          l = r.lengths,
          p = 0;
        for (e = 0; e < o - 1; e += 1) (l[e] = h(s[e], s[e + 1], a[e], n[e + 1])), (p += l[e].addedLength);
        return i && o && ((l[e] = h(s[e], s[0], a[e], n[0])), (p += l[e].addedLength)), (r.totalLength = p), r;
      }
      function i(t) {
        (this.segmentLength = 0), (this.points = new Array(t));
      }
      function s(t, e) {
        (this.partialLength = t), (this.point = e);
      }
      function a(t, e) {
        var r = e.percents,
          i = e.lengths,
          s = r.length,
          a = bm_floor((s - 1) * t),
          n = t * e.addedLength,
          o = 0;
        if (a === s - 1 || 0 === a || n === i[a]) return r[a];
        for (var h = i[a] > n ? -1 : 1, l = !0; l; )
          if ((i[a] <= n && i[a + 1] > n ? ((o = (n - i[a]) / (i[a + 1] - i[a])), (l = !1)) : (a += h), a < 0 || a >= s - 1)) {
            if (a === s - 1) return r[a];
            l = !1;
          }
        return r[a] + (r[a + 1] - r[a]) * o;
      }
      function n(t, e, r, i, s, n) {
        var o = a(s, n),
          h = 1 - o,
          l = Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * r[0] + (o * o * h + h * o * o + o * h * o) * i[0] + o * o * o * e[0])) / 1e3,
          p = Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * r[1] + (o * o * h + h * o * o + o * h * o) * i[1] + o * o * o * e[1])) / 1e3;
        return [l, p];
      }
      function o(t, e, r, i, s, n, o) {
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        var h = a(s, o);
        n = n > 1 ? 1 : n;
        var l,
          f = a(n, o),
          m = t.length,
          c = 1 - h,
          d = 1 - f,
          u = c * c * c,
          y = h * c * c * 3,
          g = h * h * c * 3,
          v = h * h * h,
          b = c * c * d,
          x = h * c * d + c * h * d + c * c * f,
          E = h * h * d + c * h * f + h * c * f,
          P = h * h * f,
          S = c * d * d,
          _ = h * d * d + c * f * d + c * d * f,
          C = h * f * d + c * f * f + h * d * f,
          A = h * f * f,
          T = d * d * d,
          k = f * d * d + d * f * d + d * d * f,
          M = f * f * d + d * f * f + f * d * f,
          D = f * f * f;
        for (l = 0; l < m; l += 1)
          (p[4 * l] = Math.round(1e3 * (u * t[l] + y * r[l] + g * i[l] + v * e[l])) / 1e3),
            (p[4 * l + 1] = Math.round(1e3 * (b * t[l] + x * r[l] + E * i[l] + P * e[l])) / 1e3),
            (p[4 * l + 2] = Math.round(1e3 * (S * t[l] + _ * r[l] + C * i[l] + A * e[l])) / 1e3),
            (p[4 * l + 3] = Math.round(1e3 * (T * t[l] + k * r[l] + M * i[l] + D * e[l])) / 1e3);
        return p;
      }
      var h =
          (Math,
          (function () {
            return function (t, e, r, i) {
              var s,
                a,
                n,
                o,
                h,
                l,
                p = defaultCurveSegments,
                f = 0,
                m = [],
                c = [],
                d = bezier_length_pool.newElement();
              for (n = r.length, s = 0; s < p; s += 1) {
                for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1)
                  (o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * e[a]), (m[a] = o), null !== c[a] && (l += bm_pow(m[a] - c[a], 2)), (c[a] = m[a]);
                l && ((l = bm_sqrt(l)), (f += l)), (d.percents[s] = h), (d.lengths[s] = f);
              }
              return (d.addedLength = f), d;
            };
          })()),
        l = (function () {
          var e = {};
          return function (r) {
            var a = r.s,
              n = r.e,
              o = r.to,
              h = r.ti,
              l = (a[0] + '_' + a[1] + '_' + n[0] + '_' + n[1] + '_' + o[0] + '_' + o[1] + '_' + h[0] + '_' + h[1]).replace(/\./g, 'p');
            if (e[l]) return void (r.bezierData = e[l]);
            var p,
              f,
              m,
              c,
              d,
              u,
              y,
              g = defaultCurveSegments,
              v = 0,
              b = null;
            2 === a.length && (a[0] != n[0] || a[1] != n[1]) && t(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && t(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) && (g = 2);
            var x = new i(g);
            for (m = o.length, p = 0; p < g; p += 1) {
              for (y = createSizedArray(m), d = p / (g - 1), u = 0, f = 0; f < m; f += 1)
                (c = bm_pow(1 - d, 3) * a[f] + 3 * bm_pow(1 - d, 2) * d * (a[f] + o[f]) + 3 * (1 - d) * bm_pow(d, 2) * (n[f] + h[f]) + bm_pow(d, 3) * n[f]), (y[f] = c), null !== b && (u += bm_pow(y[f] - b[f], 2));
              (u = bm_sqrt(u)), (v += u), (x.points[p] = new s(u, y)), (b = y);
            }
            (x.segmentLength = v), (r.bezierData = x), (e[l] = x);
          };
        })(),
        p = createTypedArray('float32', 8);
      return { getSegmentsLength: r, getNewSegment: o, getPointInSegment: n, buildBezierData: l, pointOnLine2D: t, pointOnLine3D: e };
    }
    function dataFunctionManager() {
      function t(s, a, o) {
        var h,
          l,
          p,
          f,
          m,
          c,
          d,
          u,
          y = s.length;
        for (f = 0; f < y; f += 1)
          if (((h = s[f]), 'ks' in h && !h.completed)) {
            if (((h.completed = !0), h.tt && (s[f - 1].td = h.tt), (l = []), (p = -1), h.hasMask)) {
              var g = h.masksProperties;
              for (c = g.length, m = 0; m < c; m += 1)
                if (g[m].pt.k.i) i(g[m].pt.k);
                else for (u = g[m].pt.k.length, d = 0; d < u; d += 1) g[m].pt.k[d].s && i(g[m].pt.k[d].s[0]), g[m].pt.k[d].e && i(g[m].pt.k[d].e[0]);
            }
            0 === h.ty ? ((h.layers = e(h.refId, a)), t(h.layers, a, o)) : 4 === h.ty ? r(h.shapes) : 5 == h.ty && n(h, o);
          }
      }
      function e(t, e) {
        for (var r = 0, i = e.length; r < i; ) {
          if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : ((e[r].layers.__used = !0), e[r].layers);
          r += 1;
        }
      }
      function r(t) {
        var e,
          s,
          a,
          n = t.length,
          o = !1;
        for (e = n - 1; e >= 0; e -= 1)
          if ('sh' == t[e].ty) {
            if (t[e].ks.k.i) i(t[e].ks.k);
            else for (a = t[e].ks.k.length, s = 0; s < a; s += 1) t[e].ks.k[s].s && i(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && i(t[e].ks.k[s].e[0]);
            o = !0;
          } else 'gr' == t[e].ty && r(t[e].it);
      }
      function i(t) {
        var e,
          r = t.i.length;
        for (e = 0; e < r; e += 1) (t.i[e][0] += t.v[e][0]), (t.i[e][1] += t.v[e][1]), (t.o[e][0] += t.v[e][0]), (t.o[e][1] += t.v[e][1]);
      }
      function s(t, e) {
        var r = e ? e.split('.') : [100, 100, 100];
        return t[0] > r[0] || (!(r[0] > t[0]) && (t[1] > r[1] || (!(r[1] > t[1]) && (t[2] > r[2] || (!(r[2] > t[2]) && void 0)))));
      }
      function a(e, r) {
        e.__complete || (l(e), o(e), h(e), p(e), t(e.layers, e.assets, r), (e.__complete = !0));
      }
      function n(t, e) {
        0 !== t.t.a.length || 'm' in t.t.p || (t.singleShape = !0);
      }
      var o = (function () {
          function t(t) {
            var e = t.t.d;
            t.t.d = { k: [{ s: e, t: 0 }] };
          }
          function e(e) {
            var r,
              i = e.length;
            for (r = 0; r < i; r += 1) 5 === e[r].ty && t(e[r]);
          }
          var r = [4, 4, 14];
          return function (t) {
            if (s(r, t.v) && (e(t.layers), t.assets)) {
              var i,
                a = t.assets.length;
              for (i = 0; i < a; i += 1) t.assets[i].layers && e(t.assets[i].layers);
            }
          };
        })(),
        h = (function () {
          var t = [4, 7, 99];
          return function (e) {
            if (e.chars && !s(t, e.v)) {
              var r,
                a,
                n,
                o,
                h,
                l = e.chars.length;
              for (r = 0; r < l; r += 1) if (e.chars[r].data && e.chars[r].data.shapes) for (h = e.chars[r].data.shapes[0].it, n = h.length, a = 0; a < n; a += 1) (o = h[a].ks.k), o.__converted || (i(h[a].ks.k), (o.__converted = !0));
            }
          };
        })(),
        l = (function () {
          function t(e) {
            var r,
              i,
              s,
              a = e.length;
            for (r = 0; r < a; r += 1)
              if ('gr' === e[r].ty) t(e[r].it);
              else if ('fl' === e[r].ty || 'st' === e[r].ty)
                if (e[r].c.k && e[r].c.k[0].i)
                  for (s = e[r].c.k.length, i = 0; i < s; i += 1)
                    e[r].c.k[i].s && ((e[r].c.k[i].s[0] /= 255), (e[r].c.k[i].s[1] /= 255), (e[r].c.k[i].s[2] /= 255), (e[r].c.k[i].s[3] /= 255)),
                      e[r].c.k[i].e && ((e[r].c.k[i].e[0] /= 255), (e[r].c.k[i].e[1] /= 255), (e[r].c.k[i].e[2] /= 255), (e[r].c.k[i].e[3] /= 255));
                else (e[r].c.k[0] /= 255), (e[r].c.k[1] /= 255), (e[r].c.k[2] /= 255), (e[r].c.k[3] /= 255);
          }
          function e(e) {
            var r,
              i = e.length;
            for (r = 0; r < i; r += 1) 4 === e[r].ty && t(e[r].shapes);
          }
          var r = [4, 1, 9];
          return function (t) {
            if (s(r, t.v) && (e(t.layers), t.assets)) {
              var i,
                a = t.assets.length;
              for (i = 0; i < a; i += 1) t.assets[i].layers && e(t.assets[i].layers);
            }
          };
        })(),
        p = (function () {
          function t(e) {
            var r,
              i,
              s,
              a = e.length,
              n = !1;
            for (r = a - 1; r >= 0; r -= 1)
              if ('sh' == e[r].ty) {
                if (e[r].ks.k.i) e[r].ks.k.c = e[r].closed;
                else for (s = e[r].ks.k.length, i = 0; i < s; i += 1) e[r].ks.k[i].s && (e[r].ks.k[i].s[0].c = e[r].closed), e[r].ks.k[i].e && (e[r].ks.k[i].e[0].c = e[r].closed);
                n = !0;
              } else 'gr' == e[r].ty && t(e[r].it);
          }
          function e(e) {
            var r,
              i,
              s,
              a,
              n,
              o,
              h = e.length;
            for (i = 0; i < h; i += 1) {
              if (((r = e[i]), r.hasMask)) {
                var l = r.masksProperties;
                for (a = l.length, s = 0; s < a; s += 1)
                  if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;
                  else for (o = l[s].pt.k.length, n = 0; n < o; n += 1) l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl);
              }
              4 === r.ty && t(r.shapes);
            }
          }
          var r = [4, 4, 18];
          return function (t) {
            if (s(r, t.v) && (e(t.layers), t.assets)) {
              var i,
                a = t.assets.length;
              for (i = 0; i < a; i += 1) t.assets[i].layers && e(t.assets[i].layers);
            }
          };
        })(),
        f = {};
      return (f.completeData = a), f;
    }
    function ShapePath() {
      (this.c = !1), (this._length = 0), (this._maxLength = 8), (this.v = createSizedArray(this._maxLength)), (this.o = createSizedArray(this._maxLength)), (this.i = createSizedArray(this._maxLength));
    }
    function ShapeModifier() {}
    function TrimModifier() {}
    function RoundCornersModifier() {}
    function RepeaterModifier() {}
    function ShapeCollection() {
      (this._length = 0), (this._maxLength = 4), (this.shapes = createSizedArray(this._maxLength));
    }
    function DashProperty(t, e, r, i) {
      (this.elem = t),
        (this.frameId = -1),
        (this.dataProps = createSizedArray(e.length)),
        (this.renderer = r),
        (this.k = !1),
        (this.dashStr = ''),
        (this.dashArray = createTypedArray('float32', e.length ? e.length - 1 : 0)),
        (this.dashoffset = createTypedArray('float32', 1)),
        this.initDynamicPropertyContainer(i);
      var s,
        a,
        n = e.length || 0;
      for (s = 0; s < n; s += 1) (a = PropertyFactory.getProp(t, e[s].v, 0, 0, this)), (this.k = a.k || this.k), (this.dataProps[s] = { n: e[s].n, p: a });
      this.k || this.getValue(!0), (this._isAnimated = this.k);
    }
    function GradientProperty(t, e, r) {
      (this.data = e), (this.c = createTypedArray('uint8c', 4 * e.p));
      var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
      (this.o = createTypedArray('float32', i)),
        (this._cmdf = !1),
        (this._omdf = !1),
        (this._collapsable = this.checkCollapsable()),
        (this._hasOpacity = i),
        this.initDynamicPropertyContainer(r),
        (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
        (this.k = this.prop.k),
        this.getValue(!0);
    }
    function TextAnimatorProperty(t, e, r) {
      (this._isFirstFrame = !0),
        (this._hasMaskedPath = !1),
        (this._frameId = -1),
        (this._textData = t),
        (this._renderType = e),
        (this._elem = r),
        (this._animatorsData = createSizedArray(this._textData.a.length)),
        (this._pathData = {}),
        (this._moreOptions = { alignment: {} }),
        (this.renderedLetters = []),
        (this.lettersChangedFlag = !1),
        this.initDynamicPropertyContainer(r);
    }
    function TextAnimatorDataProperty(t, e, r) {
      var i = { propType: !1 },
        s = PropertyFactory.getProp,
        a = e.a;
      (this.a = {
        r: a.r ? s(t, a.r, 0, degToRads, r) : i,
        rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
        ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
        sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
        sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
        s: a.s ? s(t, a.s, 1, 0.01, r) : i,
        a: a.a ? s(t, a.a, 1, 0, r) : i,
        o: a.o ? s(t, a.o, 0, 0.01, r) : i,
        p: a.p ? s(t, a.p, 1, 0, r) : i,
        sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
        sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
        fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
        fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
        fs: a.fs ? s(t, a.fs, 0, 0.01, r) : i,
        fb: a.fb ? s(t, a.fb, 0, 0.01, r) : i,
        t: a.t ? s(t, a.t, 0, 0, r) : i,
      }),
        (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r)),
        (this.s.t = e.s.t);
    }
    function LetterProps(t, e, r, i, s, a) {
      (this.o = t), (this.sw = e), (this.sc = r), (this.fc = i), (this.m = s), (this.p = a), (this._mdf = { o: !0, sw: !!e, sc: !!r, fc: !!i, m: !0, p: !0 });
    }
    function TextProperty(t, e) {
      (this._frameId = initialDefaultFrame),
        (this.pv = ''),
        (this.v = ''),
        (this.kf = !1),
        (this._isFirstFrame = !0),
        (this._mdf = !1),
        (this.data = e),
        (this.elem = t),
        (this.comp = this.elem.comp),
        (this.keysIndex = 0),
        (this.canResize = !1),
        (this.minimumFontSize = 1),
        (this.effectsSequence = []),
        (this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: '',
          fStyle: '',
          fWeight: '',
          fc: '',
          j: '',
          justifyOffset: '',
          l: [],
          lh: 0,
          lineWidths: [],
          ls: '',
          of: '',
          s: '',
          sc: '',
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1,
        }),
        this.copyData(this.currentData, this.data.d.k[0].s),
        this.searchProperty() || this.completeTextData(this.currentData);
    }
    function BaseRenderer() {}
    function SVGRenderer(t, e) {
      (this.animationItem = t), (this.layers = null), (this.renderedFrame = -1), (this.svgElement = createNS('svg'));
      var r = createNS('defs');
      this.svgElement.appendChild(r);
      var i = createNS('g');
      this.svgElement.appendChild(i),
        (this.layerElement = i),
        (this.renderConfig = {
          preserveAspectRatio: (e && e.preserveAspectRatio) || 'xMidYMid meet',
          imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
          progressiveLoad: (e && e.progressiveLoad) || !1,
          hideOnTransparent: !e || e.hideOnTransparent !== !1,
          viewBoxOnly: (e && e.viewBoxOnly) || !1,
          viewBoxSize: (e && e.viewBoxSize) || !1,
          className: (e && e.className) || '',
        }),
        (this.globalData = { _mdf: !1, frameNum: -1, defs: r, renderConfig: this.renderConfig }),
        (this.elements = []),
        (this.pendingElements = []),
        (this.destroyed = !1),
        (this.rendererType = 'svg');
    }
    function MaskElement(t, e, r) {
      (this.data = t), (this.element = e), (this.globalData = r), (this.storedData = []), (this.masksProperties = this.data.masksProperties || []), (this.maskElement = null);
      var i,
        s = this.globalData.defs,
        a = this.masksProperties ? this.masksProperties.length : 0;
      (this.viewData = createSizedArray(a)), (this.solidPath = '');
      var n,
        o,
        h,
        l,
        p,
        f,
        m,
        c = this.masksProperties,
        d = 0,
        u = [],
        y = randomString(10),
        g = 'clipPath',
        v = 'clip-path';
      for (i = 0; i < a; i++)
        if (
          ((('a' !== c[i].mode && 'n' !== c[i].mode) || c[i].inv || 100 !== c[i].o.k) && ((g = 'mask'), (v = 'mask')),
          ('s' != c[i].mode && 'i' != c[i].mode) || 0 !== d ? (l = null) : ((l = createNS('rect')), l.setAttribute('fill', '#ffffff'), l.setAttribute('width', this.element.comp.data.w || 0), l.setAttribute('height', this.element.comp.data.h || 0), u.push(l)),
          (n = createNS('path')),
          'n' != c[i].mode)
        ) {
          (d += 1), n.setAttribute('fill', 's' === c[i].mode ? '#000000' : '#ffffff'), n.setAttribute('clip-rule', 'nonzero');
          var b;
          if (
            (0 !== c[i].x.k
              ? ((g = 'mask'),
                (v = 'mask'),
                (m = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element)),
                (b = 'fi_' + randomString(10)),
                (p = createNS('filter')),
                p.setAttribute('id', b),
                (f = createNS('feMorphology')),
                f.setAttribute('operator', 'dilate'),
                f.setAttribute('in', 'SourceGraphic'),
                f.setAttribute('radius', '0'),
                p.appendChild(f),
                s.appendChild(p),
                n.setAttribute('stroke', 's' === c[i].mode ? '#000000' : '#ffffff'))
              : ((f = null), (m = null)),
            (this.storedData[i] = { elem: n, x: m, expan: f, lastPath: '', lastOperator: '', filterId: b, lastRadius: 0 }),
            'i' == c[i].mode)
          ) {
            h = u.length;
            var x = createNS('g');
            for (o = 0; o < h; o += 1) x.appendChild(u[o]);
            var E = createNS('mask');
            E.setAttribute('mask-type', 'alpha'), E.setAttribute('id', y + '_' + d), E.appendChild(n), s.appendChild(E), x.setAttribute('mask', 'url(' + locationHref + '#' + y + '_' + d + ')'), (u.length = 0), u.push(x);
          } else u.push(n);
          c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
            (this.viewData[i] = { elem: n, lastPath: '', op: PropertyFactory.getProp(this.element, c[i].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3), invRect: l }),
            this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
        } else (this.viewData[i] = { op: PropertyFactory.getProp(this.element, c[i].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3), elem: n, lastPath: '' }), s.appendChild(n);
      for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) this.maskElement.appendChild(u[i]);
      d > 0 && (this.maskElement.setAttribute('id', y), this.element.maskedElement.setAttribute(v, 'url(' + locationHref + '#' + y + ')'), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
    }
    function HierarchyElement() {}
    function FrameElement() {}
    function TransformElement() {}
    function RenderableElement() {}
    function RenderableDOMElement() {}
    function ProcessedElement(t, e) {
      (this.elem = t), (this.pos = e);
    }
    function SVGStyleData(t, e) {
      (this.data = t), (this.type = t.ty), (this.d = ''), (this.lvl = e), (this._mdf = !1), (this.closed = t.hd === !0), (this.pElem = createNS('path')), (this.msElem = null);
    }
    function SVGShapeData(t, e, r) {
      (this.caches = []), (this.styles = []), (this.transformers = t), (this.lStr = ''), (this.sh = r), (this.lvl = e), (this._isAnimated = !!r.k);
      for (var i = 0, s = t.length; i < s; ) {
        if (t[i].mProps.dynamicProperties.length) {
          this._isAnimated = !0;
          break;
        }
        i += 1;
      }
    }
    function SVGTransformData(t, e, r) {
      (this.transform = { mProps: t, op: e, container: r }), (this.elements = []), (this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length);
    }
    function SVGStrokeStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, 'svg', this)),
        (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
        (this.style = r),
        (this._isAnimated = !!this._isAnimated);
    }
    function SVGFillStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t), (this.getValue = this.iterateDynamicProperties), (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)), (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)), (this.style = r);
    }
    function SVGGradientFillStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t), (this.getValue = this.iterateDynamicProperties), this.initGradientData(t, e, r);
    }
    function SVGGradientStrokeStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, 'svg', this)),
        this.initGradientData(t, e, r),
        (this._isAnimated = !!this._isAnimated);
    }
    function ShapeGroupData() {
      (this.it = []), (this.prevViewData = []), (this.gr = createNS('g'));
    }
    function ShapeTransformManager() {
      (this.sequences = {}), (this.sequenceList = []), (this.transform_key_count = 0);
    }
    function BaseElement() {}
    function NullElement(t, e, r) {
      this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
    }
    function SVGBaseElement() {}
    function IShapeElement() {}
    function ITextElement() {}
    function ICompElement() {}
    function IImageElement(t, e, r) {
      (this.assetData = e.getAssetData(t.refId)), this.initElement(t, e, r);
    }
    function ISolidElement(t, e, r) {
      this.initElement(t, e, r);
    }
    function SVGCompElement(t, e, r) {
      (this.layers = t.layers),
        (this.supports3d = !0),
        (this.completeLayers = !1),
        (this.pendingElements = []),
        (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
        this.initElement(t, e, r),
        (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
    }
    function SVGTextElement(t, e, r) {
      (this.textSpans = []), (this.renderType = 'svg'), this.initElement(t, e, r);
    }
    function SVGShapeElement(t, e, r) {
      (this.shapes = []), (this.shapesData = t.shapes), (this.stylesList = []), (this.shapeModifiers = []), (this.itemsData = []), (this.processedElements = []), (this.animatedContents = []), this.initElement(t, e, r), (this.prevViewData = []);
    }
    function SVGTintFilter(t, e) {
      this.filterManager = e;
      var r = createNS('feColorMatrix');
      if (
        (r.setAttribute('type', 'matrix'),
        r.setAttribute('color-interpolation-filters', 'linearRGB'),
        r.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'),
        r.setAttribute('result', 'f1'),
        t.appendChild(r),
        (r = createNS('feColorMatrix')),
        r.setAttribute('type', 'matrix'),
        r.setAttribute('color-interpolation-filters', 'sRGB'),
        r.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'),
        r.setAttribute('result', 'f2'),
        t.appendChild(r),
        (this.matrixFilter = r),
        100 !== e.effectElements[2].p.v || e.effectElements[2].p.k)
      ) {
        var i = createNS('feMerge');
        t.appendChild(i);
        var s;
        (s = createNS('feMergeNode')), s.setAttribute('in', 'SourceGraphic'), i.appendChild(s), (s = createNS('feMergeNode')), s.setAttribute('in', 'f2'), i.appendChild(s);
      }
    }
    function SVGFillFilter(t, e) {
      this.filterManager = e;
      var r = createNS('feColorMatrix');
      r.setAttribute('type', 'matrix'), r.setAttribute('color-interpolation-filters', 'sRGB'), r.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'), t.appendChild(r), (this.matrixFilter = r);
    }
    function SVGStrokeEffect(t, e) {
      (this.initialized = !1), (this.filterManager = e), (this.elem = t), (this.paths = []);
    }
    function SVGTritoneFilter(t, e) {
      this.filterManager = e;
      var r = createNS('feColorMatrix');
      r.setAttribute('type', 'matrix'),
        r.setAttribute('color-interpolation-filters', 'linearRGB'),
        r.setAttribute('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'),
        r.setAttribute('result', 'f1'),
        t.appendChild(r);
      var i = createNS('feComponentTransfer');
      i.setAttribute('color-interpolation-filters', 'sRGB'), t.appendChild(i), (this.matrixFilter = i);
      var s = createNS('feFuncR');
      s.setAttribute('type', 'table'), i.appendChild(s), (this.feFuncR = s);
      var a = createNS('feFuncG');
      a.setAttribute('type', 'table'), i.appendChild(a), (this.feFuncG = a);
      var n = createNS('feFuncB');
      n.setAttribute('type', 'table'), i.appendChild(n), (this.feFuncB = n);
    }
    function SVGProLevelsFilter(t, e) {
      this.filterManager = e;
      var r = this.filterManager.effectElements,
        i = createNS('feComponentTransfer');
      (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc('feFuncR', i)),
        (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc('feFuncG', i)),
        (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc('feFuncB', i)),
        (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc('feFuncA', i)),
        (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute('color-interpolation-filters', 'sRGB'), t.appendChild(i), (i = createNS('feComponentTransfer'))),
        (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) &&
          (i.setAttribute('color-interpolation-filters', 'sRGB'), t.appendChild(i), (this.feFuncRComposed = this.createFeFunc('feFuncR', i)), (this.feFuncGComposed = this.createFeFunc('feFuncG', i)), (this.feFuncBComposed = this.createFeFunc('feFuncB', i)));
    }
    function SVGDropShadowEffect(t, e) {
      t.setAttribute('x', '-100%'), t.setAttribute('y', '-100%'), t.setAttribute('width', '400%'), t.setAttribute('height', '400%'), (this.filterManager = e);
      var r = createNS('feGaussianBlur');
      r.setAttribute('in', 'SourceAlpha'), r.setAttribute('result', 'drop_shadow_1'), r.setAttribute('stdDeviation', '0'), (this.feGaussianBlur = r), t.appendChild(r);
      var i = createNS('feOffset');
      i.setAttribute('dx', '25'), i.setAttribute('dy', '0'), i.setAttribute('in', 'drop_shadow_1'), i.setAttribute('result', 'drop_shadow_2'), (this.feOffset = i), t.appendChild(i);
      var s = createNS('feFlood');
      s.setAttribute('flood-color', '#00ff00'), s.setAttribute('flood-opacity', '1'), s.setAttribute('result', 'drop_shadow_3'), (this.feFlood = s), t.appendChild(s);
      var a = createNS('feComposite');
      a.setAttribute('in', 'drop_shadow_3'), a.setAttribute('in2', 'drop_shadow_2'), a.setAttribute('operator', 'in'), a.setAttribute('result', 'drop_shadow_4'), t.appendChild(a);
      var n = createNS('feMerge');
      t.appendChild(n);
      var o;
      (o = createNS('feMergeNode')), n.appendChild(o), (o = createNS('feMergeNode')), o.setAttribute('in', 'SourceGraphic'), (this.feMergeNode = o), (this.feMerge = n), (this.originalNodeAdded = !1), n.appendChild(o);
    }
    function SVGMatte3Effect(t, e, r) {
      (this.initialized = !1), (this.filterManager = e), (this.filterElem = t), (this.elem = r), (r.matteElement = createNS('g')), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), (r.baseElement = r.matteElement);
    }
    function SVGEffects(t) {
      var e,
        r = t.data.ef ? t.data.ef.length : 0,
        i = randomString(10),
        s = filtersFactory.createFilter(i),
        a = 0;
      this.filters = [];
      var n;
      for (e = 0; e < r; e += 1)
        (n = null),
          20 === t.data.ef[e].ty
            ? ((a += 1), (n = new SVGTintFilter(s, t.effectsManager.effectElements[e])))
            : 21 === t.data.ef[e].ty
            ? ((a += 1), (n = new SVGFillFilter(s, t.effectsManager.effectElements[e])))
            : 22 === t.data.ef[e].ty
            ? (n = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]))
            : 23 === t.data.ef[e].ty
            ? ((a += 1), (n = new SVGTritoneFilter(s, t.effectsManager.effectElements[e])))
            : 24 === t.data.ef[e].ty
            ? ((a += 1), (n = new SVGProLevelsFilter(s, t.effectsManager.effectElements[e])))
            : 25 === t.data.ef[e].ty
            ? ((a += 1), (n = new SVGDropShadowEffect(s, t.effectsManager.effectElements[e])))
            : 28 === t.data.ef[e].ty && (n = new SVGMatte3Effect(s, t.effectsManager.effectElements[e], t)),
          n && this.filters.push(n);
      a && (t.globalData.defs.appendChild(s), t.layerElement.setAttribute('filter', 'url(' + locationHref + '#' + i + ')')), this.filters.length && t.addRenderableComponent(this);
    }
    function EffectsManager() {}
    function CanvasRenderer(t, e) {
      (this.animationItem = t),
        (this.renderConfig = {
          clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
          context: (e && e.context) || null,
          progressiveLoad: (e && e.progressiveLoad) || !1,
          preserveAspectRatio: (e && e.preserveAspectRatio) || 'xMidYMid meet',
          imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
          className: (e && e.className) || '',
        }),
        (this.renderConfig.dpr = (e && e.dpr) || 1),
        this.animationItem.wrapper && (this.renderConfig.dpr = (e && e.dpr) || window.devicePixelRatio || 1),
        (this.renderedFrame = -1),
        (this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }),
        (this.contextData = new CVContextData()),
        (this.elements = []),
        (this.pendingElements = []),
        (this.transformMat = new Matrix()),
        (this.completeLayers = !1),
        (this.rendererType = 'canvas');
    }
    function HybridRenderer(t, e) {
      (this.animationItem = t),
        (this.layers = null),
        (this.renderedFrame = -1),
        (this.renderConfig = { className: (e && e.className) || '', imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice', hideOnTransparent: !e || e.hideOnTransparent !== !1 }),
        (this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }),
        (this.pendingElements = []),
        (this.elements = []),
        (this.threeDElements = []),
        (this.destroyed = !1),
        (this.camera = null),
        (this.supports3d = !0),
        (this.rendererType = 'html');
    }
    function CVShapeData(t, e, r, i) {
      (this.styledShapes = []), (this.tr = [0, 0, 0, 0, 0, 0]);
      var s = 4;
      'rc' == e.ty ? (s = 5) : 'el' == e.ty ? (s = 6) : 'sr' == e.ty && (s = 7), (this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t));
      var a,
        n,
        o = r.length;
      for (a = 0; a < o; a += 1) r[a].closed || ((n = { transforms: i.addTransformSequence(r[a].transforms), trNodes: [] }), this.styledShapes.push(n), r[a].elements.push(n));
    }
    function CVContextData() {
      (this.saved = []), (this.cArrPos = 0), (this.cTr = new Matrix()), (this.cO = 1);
      var t,
        e = 15;
      for (this.savedOp = createTypedArray('float32', e), t = 0; t < e; t += 1) this.saved[t] = createTypedArray('float32', 16);
      this._length = e;
    }
    function CVBaseElement() {}
    function CVImageElement(t, e, r) {
      (this.failed = !1), (this.assetData = e.getAssetData(t.refId)), (this.img = e.imageLoader.getImage(this.assetData)), this.initElement(t, e, r);
    }
    function CVCompElement(t, e, r) {
      (this.completeLayers = !1),
        (this.layers = t.layers),
        (this.pendingElements = []),
        (this.elements = createSizedArray(this.layers.length)),
        this.initElement(t, e, r),
        (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
    }
    function CVMaskElement(t, e) {
      (this.data = t), (this.element = e), (this.masksProperties = this.data.masksProperties || []), (this.viewData = createSizedArray(this.masksProperties.length));
      var r,
        i = this.masksProperties.length,
        s = !1;
      for (r = 0; r < i; r++) 'n' !== this.masksProperties[r].mode && (s = !0), (this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3));
      (this.hasMasks = s), s && this.element.addRenderableComponent(this);
    }
    function CVShapeElement(t, e, r) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.itemsData = []),
        (this.prevViewData = []),
        (this.shapeModifiers = []),
        (this.processedElements = []),
        (this.transformsManager = new ShapeTransformManager()),
        this.initElement(t, e, r);
    }
    function CVSolidElement(t, e, r) {
      this.initElement(t, e, r);
    }
    function CVTextElement(t, e, r) {
      (this.textSpans = []),
        (this.yOffset = 0),
        (this.fillColorAnim = !1),
        (this.strokeColorAnim = !1),
        (this.strokeWidthAnim = !1),
        (this.stroke = !1),
        (this.fill = !1),
        (this.justifyOffset = 0),
        (this.currentRender = null),
        (this.renderType = 'canvas'),
        (this.values = { fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', sWidth: 0, fValue: '' }),
        this.initElement(t, e, r);
    }
    function CVEffects() {}
    function HBaseElement(t, e, r) {}
    function HSolidElement(t, e, r) {
      this.initElement(t, e, r);
    }
    function HCompElement(t, e, r) {
      (this.layers = t.layers),
        (this.supports3d = !t.hasMask),
        (this.completeLayers = !1),
        (this.pendingElements = []),
        (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
        this.initElement(t, e, r),
        (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
    }
    function HShapeElement(t, e, r) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.shapeModifiers = []),
        (this.itemsData = []),
        (this.processedElements = []),
        (this.animatedContents = []),
        (this.shapesContainer = createNS('g')),
        this.initElement(t, e, r),
        (this.prevViewData = []),
        (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 });
    }
    function HTextElement(t, e, r) {
      (this.textSpans = []), (this.textPaths = []), (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 }), (this.renderType = 'svg'), (this.isMasked = !1), this.initElement(t, e, r);
    }
    function HImageElement(t, e, r) {
      (this.assetData = e.getAssetData(t.refId)), this.initElement(t, e, r);
    }
    function HCameraElement(t, e, r) {
      this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
      var i = PropertyFactory.getProp;
      if (
        ((this.pe = i(this, t.pe, 0, 0, this)),
        t.ks.p.s ? ((this.px = i(this, t.ks.p.x, 1, 0, this)), (this.py = i(this, t.ks.p.y, 1, 0, this)), (this.pz = i(this, t.ks.p.z, 1, 0, this))) : (this.p = i(this, t.ks.p, 1, 0, this)),
        t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)),
        t.ks.or.k.length && t.ks.or.k[0].to)
      ) {
        var s,
          a = t.ks.or.k.length;
        for (s = 0; s < a; s += 1) (t.ks.or.k[s].to = null), (t.ks.or.k[s].ti = null);
      }
      (this.or = i(this, t.ks.or, 1, degToRads, this)),
        (this.or.sh = !0),
        (this.rx = i(this, t.ks.rx, 0, degToRads, this)),
        (this.ry = i(this, t.ks.ry, 0, degToRads, this)),
        (this.rz = i(this, t.ks.rz, 0, degToRads, this)),
        (this.mat = new Matrix()),
        (this._prevMat = new Matrix()),
        (this._isFirstFrame = !0);
    }
    function HEffects() {}
    function SliderEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function AngleEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function ColorEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
    }
    function PointEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
    }
    function LayerIndexEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function MaskIndexEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function CheckboxEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function NoValueEffect() {
      this.p = {};
    }
    function EffectsManager(t, e) {
      var r = t.ef || [];
      this.effectElements = [];
      var i,
        s,
        a = r.length;
      for (i = 0; i < a; i++) (s = new GroupEffect(r[i], e)), this.effectElements.push(s);
    }
    function GroupEffect(t, e) {
      this.init(t, e);
    }
    function setLocationHref(t) {
      locationHref = t;
    }
    function searchAnimations() {
      standalone === !0 ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
    }
    function setSubframeRendering(t) {
      subframeEnabled = t;
    }
    function loadAnimation(t) {
      return standalone === !0 && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
    }
    function setQuality(t) {
      if ('string' == typeof t)
        switch (t) {
          case 'high':
            defaultCurveSegments = 200;
            break;
          case 'medium':
            defaultCurveSegments = 50;
            break;
          case 'low':
            defaultCurveSegments = 10;
        }
      else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
      roundValues(!(defaultCurveSegments >= 50));
    }
    function inBrowser() {
      return 'undefined' != typeof navigator;
    }
    function installPlugin(t, e) {
      'expressions' === t && (expressionsPlugin = e);
    }
    function getFactory(t) {
      switch (t) {
        case 'propertyFactory':
          return PropertyFactory;
        case 'shapePropertyFactory':
          return ShapePropertyFactory;
        case 'matrix':
          return Matrix;
      }
    }
    function checkReady() {
      'complete' === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
    }
    function getQueryVariable(t) {
      for (var e = queryString.split('&'), r = 0; r < e.length; r++) {
        var i = e[r].split('=');
        if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
      }
    }
    var svgNS = 'http://www.w3.org/2000/svg',
      locationHref = '',
      initialDefaultFrame = -999999,
      subframeEnabled = !0,
      expressionsPlugin,
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      cachedColors = {},
      bm_rounder = Math.round,
      bm_rnd,
      bm_pow = Math.pow,
      bm_sqrt = Math.sqrt,
      bm_abs = Math.abs,
      bm_floor = Math.floor,
      bm_max = Math.max,
      bm_min = Math.min,
      blitter = 10,
      BMMath = {};
    !(function () {
      var t,
        e = Object.getOwnPropertyNames(Math),
        r = e.length;
      for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]];
    })(),
      (BMMath.random = Math.random),
      (BMMath.abs = function (t) {
        var e = typeof t;
        if ('object' === e && t.length) {
          var r,
            i = createSizedArray(t.length),
            s = t.length;
          for (r = 0; r < s; r += 1) i[r] = Math.abs(t[r]);
          return i;
        }
        return Math.abs(t);
      });
    var defaultCurveSegments = 150,
      degToRads = Math.PI / 180,
      roundCorner = 0.5519;
    roundValues(!1);
    var rgbToHex = (function () {
      var t,
        e,
        r = [];
      for (t = 0; t < 256; t += 1) (e = t.toString(16)), (r[t] = 1 == e.length ? '0' + e : e);
      return function (t, e, i) {
        return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), '#' + r[t] + r[e] + r[i];
      };
    })();
    BaseEvent.prototype = {
      triggerEvent: function (t, e) {
        if (this._cbs[t]) for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e);
      },
      addEventListener: function (t, e) {
        return (
          this._cbs[t] || (this._cbs[t] = []),
          this._cbs[t].push(e),
          function () {
            this.removeEventListener(t, e);
          }.bind(this)
        );
      },
      removeEventListener: function (t, e) {
        if (e) {
          if (this._cbs[t]) {
            for (var r = 0, i = this._cbs[t].length; r < i; ) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), (r -= 1), (i -= 1)), (r += 1);
            this._cbs[t].length || (this._cbs[t] = null);
          }
        } else this._cbs[t] = null;
      },
    };
    var createTypedArray = (function () {
      function t(t, e) {
        var r,
          i = 0,
          s = [];
        switch (t) {
          case 'int16':
          case 'uint8c':
            r = 1;
            break;
          default:
            r = 1.1;
        }
        for (i = 0; i < e; i += 1) s.push(r);
        return s;
      }
      function e(t, e) {
        return 'float32' === t ? new Float32Array(e) : 'int16' === t ? new Int16Array(e) : 'uint8c' === t ? new Uint8ClampedArray(e) : void 0;
      }
      return 'function' == typeof Uint8ClampedArray && 'function' == typeof Float32Array ? e : t;
    })();
    DynamicPropertyContainer.prototype = {
      addDynamicProperty: function (t) {
        this.dynamicProperties.indexOf(t) === -1 && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), (this._isAnimated = !0));
      },
      iterateDynamicProperties: function () {
        this._mdf = !1;
        var t,
          e = this.dynamicProperties.length;
        for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
      },
      initDynamicPropertyContainer: function (t) {
        (this.container = t), (this.dynamicProperties = []), (this._mdf = !1), (this._isAnimated = !1);
      },
    };
    var Matrix = (function () {
      function t() {
        return (
          (this.props[0] = 1),
          (this.props[1] = 0),
          (this.props[2] = 0),
          (this.props[3] = 0),
          (this.props[4] = 0),
          (this.props[5] = 1),
          (this.props[6] = 0),
          (this.props[7] = 0),
          (this.props[8] = 0),
          (this.props[9] = 0),
          (this.props[10] = 1),
          (this.props[11] = 0),
          (this.props[12] = 0),
          (this.props[13] = 0),
          (this.props[14] = 0),
          (this.props[15] = 1),
          this
        );
      }
      function e(t) {
        if (0 === t) return this;
        var e = k(t),
          r = M(t);
        return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function r(t) {
        if (0 === t) return this;
        var e = k(t),
          r = M(t);
        return this._t(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1);
      }
      function i(t) {
        if (0 === t) return this;
        var e = k(t),
          r = M(t);
        return this._t(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1);
      }
      function s(t) {
        if (0 === t) return this;
        var e = k(t),
          r = M(t);
        return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function a(t, e) {
        return this._t(1, e, t, 1, 0, 0);
      }
      function n(t, e) {
        return this.shear(D(t), D(e));
      }
      function o(t, e) {
        var r = k(e),
          i = M(e);
        return this._t(r, i, 0, 0, -i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, D(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function h(t, e, r) {
        return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
      }
      function l(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
        return (
          (this.props[0] = t),
          (this.props[1] = e),
          (this.props[2] = r),
          (this.props[3] = i),
          (this.props[4] = s),
          (this.props[5] = a),
          (this.props[6] = n),
          (this.props[7] = o),
          (this.props[8] = h),
          (this.props[9] = l),
          (this.props[10] = p),
          (this.props[11] = f),
          (this.props[12] = m),
          (this.props[13] = c),
          (this.props[14] = d),
          (this.props[15] = u),
          this
        );
      }
      function p(t, e, r) {
        return (r = r || 0), 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this;
      }
      function f(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
        var y = this.props;
        if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f)
          return (y[12] = y[12] * t + y[15] * m), (y[13] = y[13] * a + y[15] * c), (y[14] = y[14] * p + y[15] * d), (y[15] = y[15] * u), (this._identityCalculated = !1), this;
        var g = y[0],
          v = y[1],
          b = y[2],
          x = y[3],
          E = y[4],
          P = y[5],
          S = y[6],
          _ = y[7],
          C = y[8],
          A = y[9],
          T = y[10],
          k = y[11],
          M = y[12],
          D = y[13],
          w = y[14],
          F = y[15];
        return (
          (y[0] = g * t + v * s + b * h + x * m),
          (y[1] = g * e + v * a + b * l + x * c),
          (y[2] = g * r + v * n + b * p + x * d),
          (y[3] = g * i + v * o + b * f + x * u),
          (y[4] = E * t + P * s + S * h + _ * m),
          (y[5] = E * e + P * a + S * l + _ * c),
          (y[6] = E * r + P * n + S * p + _ * d),
          (y[7] = E * i + P * o + S * f + _ * u),
          (y[8] = C * t + A * s + T * h + k * m),
          (y[9] = C * e + A * a + T * l + k * c),
          (y[10] = C * r + A * n + T * p + k * d),
          (y[11] = C * i + A * o + T * f + k * u),
          (y[12] = M * t + D * s + w * h + F * m),
          (y[13] = M * e + D * a + w * l + F * c),
          (y[14] = M * r + D * n + w * p + F * d),
          (y[15] = M * i + D * o + w * f + F * u),
          (this._identityCalculated = !1),
          this
        );
      }
      function m() {
        return (
          this._identityCalculated ||
            ((this._identity = !(
              1 !== this.props[0] ||
              0 !== this.props[1] ||
              0 !== this.props[2] ||
              0 !== this.props[3] ||
              0 !== this.props[4] ||
              1 !== this.props[5] ||
              0 !== this.props[6] ||
              0 !== this.props[7] ||
              0 !== this.props[8] ||
              0 !== this.props[9] ||
              1 !== this.props[10] ||
              0 !== this.props[11] ||
              0 !== this.props[12] ||
              0 !== this.props[13] ||
              0 !== this.props[14] ||
              1 !== this.props[15]
            )),
            (this._identityCalculated = !0)),
          this._identity
        );
      }
      function c(t) {
        for (var e = 0; e < 16; ) {
          if (t.props[e] !== this.props[e]) return !1;
          e += 1;
        }
        return !0;
      }
      function d(t) {
        var e;
        for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
      }
      function u(t) {
        var e;
        for (e = 0; e < 16; e += 1) this.props[e] = t[e];
      }
      function y(t, e, r) {
        return { x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14] };
      }
      function g(t, e, r) {
        return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12];
      }
      function v(t, e, r) {
        return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13];
      }
      function b(t, e, r) {
        return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14];
      }
      function x(t) {
        var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
          r = this.props[5] / e,
          i = -this.props[1] / e,
          s = -this.props[4] / e,
          a = this.props[0] / e,
          n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
          o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
        return [t[0] * r + t[1] * s + n, t[0] * i + t[1] * a + o, 0];
      }
      function E(t) {
        var e,
          r = t.length,
          i = [];
        for (e = 0; e < r; e += 1) i[e] = x(t[e]);
        return i;
      }
      function P(t, e, r) {
        var i = createTypedArray('float32', 6);
        if (this.isIdentity()) (i[0] = t[0]), (i[1] = t[1]), (i[2] = e[0]), (i[3] = e[1]), (i[4] = r[0]), (i[5] = r[1]);
        else {
          var s = this.props[0],
            a = this.props[1],
            n = this.props[4],
            o = this.props[5],
            h = this.props[12],
            l = this.props[13];
          (i[0] = t[0] * s + t[1] * n + h), (i[1] = t[0] * a + t[1] * o + l), (i[2] = e[0] * s + e[1] * n + h), (i[3] = e[0] * a + e[1] * o + l), (i[4] = r[0] * s + r[1] * n + h), (i[5] = r[0] * a + r[1] * o + l);
        }
        return i;
      }
      function S(t, e, r) {
        var i;
        return (i = this.isIdentity()
          ? [t, e, r]
          : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]);
      }
      function _(t, e) {
        if (this.isIdentity()) return t + ',' + e;
        var r = this.props;
        return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + ',' + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100;
      }
      function C() {
        for (var t = 0, e = this.props, r = 'matrix3d(', i = 1e4; t < 16; ) (r += w(e[t] * i) / i), (r += 15 === t ? ')' : ','), (t += 1);
        return r;
      }
      function A(t) {
        var e = 1e4;
        return (t < 1e-6 && t > 0) || (t > -1e-6 && t < 0) ? w(t * e) / e : t;
      }
      function T() {
        var t = this.props,
          e = A(t[0]),
          r = A(t[1]),
          i = A(t[4]),
          s = A(t[5]),
          a = A(t[12]),
          n = A(t[13]);
        return 'matrix(' + e + ',' + r + ',' + i + ',' + s + ',' + a + ',' + n + ')';
      }
      var k = Math.cos,
        M = Math.sin,
        D = Math.tan,
        w = Math.round;
      return function () {
        (this.reset = t),
          (this.rotate = e),
          (this.rotateX = r),
          (this.rotateY = i),
          (this.rotateZ = s),
          (this.skew = n),
          (this.skewFromAxis = o),
          (this.shear = a),
          (this.scale = h),
          (this.setTransform = l),
          (this.translate = p),
          (this.transform = f),
          (this.applyToPoint = y),
          (this.applyToX = g),
          (this.applyToY = v),
          (this.applyToZ = b),
          (this.applyToPointArray = S),
          (this.applyToTriplePoints = P),
          (this.applyToPointStringified = _),
          (this.toCSS = C),
          (this.to2dCSS = T),
          (this.clone = d),
          (this.cloneFromProps = u),
          (this.equals = c),
          (this.inversePoints = E),
          (this.inversePoint = x),
          (this._t = this.transform),
          (this.isIdentity = m),
          (this._identity = !0),
          (this._identityCalculated = !1),
          (this.props = createTypedArray('float32', 16)),
          this.reset();
      };
    })();
    !(function (t, e) {
      function r(r, l, p) {
        var c = [];
        l = l === !0 ? { entropy: !0 } : l || {};
        var v = n(a(l.entropy ? [r, h(t)] : null === r ? o() : r, 3), c),
          b = new i(c),
          x = function () {
            for (var t = b.g(m), e = u, r = 0; t < y; ) (t = (t + r) * f), (e *= f), (r = b.g(1));
            for (; t >= g; ) (t /= 2), (e /= 2), (r >>>= 1);
            return (t + r) / e;
          };
        return (
          (x.int32 = function () {
            return 0 | b.g(4);
          }),
          (x.quick = function () {
            return b.g(4) / 4294967296;
          }),
          (x['double'] = x),
          n(h(b.S), t),
          (
            l.pass ||
            p ||
            function (t, r, i, a) {
              return (
                a &&
                  (a.S && s(a, b),
                  (t.state = function () {
                    return s(b, {});
                  })),
                i ? ((e[d] = t), r) : t
              );
            }
          )(x, v, 'global' in l ? l.global : this == e, l.state)
        );
      }
      function i(t) {
        var e,
          r = t.length,
          i = this,
          s = 0,
          a = (i.i = i.j = 0),
          n = (i.S = []);
        for (r || (t = [r++]); s < f; ) n[s] = s++;
        for (s = 0; s < f; s++) (n[s] = n[(a = v & (a + t[s % r] + (e = n[s])))]), (n[a] = e);
        i.g = function (t) {
          for (var e, r = 0, s = i.i, a = i.j, n = i.S; t--; ) (e = n[(s = v & (s + 1))]), (r = r * f + n[v & ((n[s] = n[(a = v & (a + e))]) + (n[a] = e))]);
          return (i.i = s), (i.j = a), r;
        };
      }
      function s(t, e) {
        return (e.i = t.i), (e.j = t.j), (e.S = t.S.slice()), e;
      }
      function a(t, e) {
        var r,
          i = [],
          s = typeof t;
        if (e && 'object' == s)
          for (r in t)
            try {
              i.push(a(t[r], e - 1));
            } catch (n) {}
        return i.length ? i : 'string' == s ? t : t + '\0';
      }
      function n(t, e) {
        for (var r, i = t + '', s = 0; s < i.length; ) e[v & s] = v & ((r ^= 19 * e[v & s]) + i.charCodeAt(s++));
        return h(e);
      }
      function o() {
        try {
          if (l) return h(l.randomBytes(f));
          var e = new Uint8Array(f);
          return (p.crypto || p.msCrypto).getRandomValues(e), h(e);
        } catch (r) {
          var i = p.navigator,
            s = i && i.plugins;
          return [+new Date(), p, s, p.screen, h(t)];
        }
      }
      function h(t) {
        return String.fromCharCode.apply(0, t);
      }
      var l,
        p = this,
        f = 256,
        m = 6,
        c = 52,
        d = 'random',
        u = e.pow(f, m),
        y = e.pow(2, c),
        g = 2 * y,
        v = f - 1;
      (e['seed' + d] = r), n(e.random(), t);
    })([], BMMath);
    var BezierFactory = (function () {
      function t(t, e, r, i, s) {
        var a = s || ('bez_' + t + '_' + e + '_' + r + '_' + i).replace(/\./g, 'p');
        if (p[a]) return p[a];
        var n = new h([t, e, r, i]);
        return (p[a] = n), n;
      }
      function e(t, e) {
        return 1 - 3 * e + 3 * t;
      }
      function r(t, e) {
        return 3 * e - 6 * t;
      }
      function i(t) {
        return 3 * t;
      }
      function s(t, s, a) {
        return ((e(s, a) * t + r(s, a)) * t + i(s)) * t;
      }
      function a(t, s, a) {
        return 3 * e(s, a) * t * t + 2 * r(s, a) * t + i(s);
      }
      function n(t, e, r, i, a) {
        var n,
          o,
          h = 0;
        do (o = e + (r - e) / 2), (n = s(o, i, a) - t), n > 0 ? (r = o) : (e = o);
        while (Math.abs(n) > c && ++h < d);
        return o;
      }
      function o(t, e, r, i) {
        for (var n = 0; n < f; ++n) {
          var o = a(e, r, i);
          if (0 === o) return e;
          var h = s(e, r, i) - t;
          e -= h / o;
        }
        return e;
      }
      function h(t) {
        (this._p = t), (this._mSampleValues = g ? new Float32Array(u) : new Array(u)), (this._precomputed = !1), (this.get = this.get.bind(this));
      }
      var l = {};
      l.getBezierEasing = t;
      var p = {},
        f = 4,
        m = 0.001,
        c = 1e-7,
        d = 10,
        u = 11,
        y = 1 / (u - 1),
        g = 'function' == typeof Float32Array;
      return (
        (h.prototype = {
          get: function (t) {
            var e = this._p[0],
              r = this._p[1],
              i = this._p[2],
              a = this._p[3];
            return this._precomputed || this._precompute(), e === r && i === a ? t : 0 === t ? 0 : 1 === t ? 1 : s(this._getTForX(t), r, a);
          },
          _precompute: function () {
            var t = this._p[0],
              e = this._p[1],
              r = this._p[2],
              i = this._p[3];
            (this._precomputed = !0), (t === e && r === i) || this._calcSampleValues();
          },
          _calcSampleValues: function () {
            for (var t = this._p[0], e = this._p[2], r = 0; r < u; ++r) this._mSampleValues[r] = s(r * y, t, e);
          },
          _getTForX: function (t) {
            for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, s = 0, h = 1, l = u - 1; h !== l && i[h] <= t; ++h) s += y;
            --h;
            var p = (t - i[h]) / (i[h + 1] - i[h]),
              f = s + p * y,
              c = a(f, e, r);
            return c >= m ? o(t, f, e, r) : 0 === c ? f : n(t, s, s + y, e, r);
          },
        }),
        l
      );
    })();
    !(function () {
      for (var t = 0, e = ['ms', 'moz', 'webkit', 'o'], r = 0; r < e.length && !window.requestAnimationFrame; ++r)
        (window.requestAnimationFrame = window[e[r] + 'RequestAnimationFrame']), (window.cancelAnimationFrame = window[e[r] + 'CancelAnimationFrame'] || window[e[r] + 'CancelRequestAnimationFrame']);
      window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (e, r) {
          var i = new Date().getTime(),
            s = Math.max(0, 16 - (i - t)),
            a = setTimeout(function () {
              e(i + s);
            }, s);
          return (t = i + s), a;
        }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame = function (t) {
            clearTimeout(t);
          });
    })();
    var bez = bezFunction(),
      dataManager = dataFunctionManager(),
      FontManager = (function () {
        function t(t, e) {
          var r = createTag('span');
          r.style.fontFamily = e;
          var i = createTag('span');
          (i.innerHTML = 'giItT1WQy@!-/#'),
            (r.style.position = 'absolute'),
            (r.style.left = '-10000px'),
            (r.style.top = '-10000px'),
            (r.style.fontSize = '300px'),
            (r.style.fontVariant = 'normal'),
            (r.style.fontStyle = 'normal'),
            (r.style.fontWeight = 'normal'),
            (r.style.letterSpacing = '0'),
            r.appendChild(i),
            document.body.appendChild(r);
          var s = i.offsetWidth;
          return (i.style.fontFamily = t + ', ' + e), { node: i, w: s, parent: r };
        }
        function e() {
          var t,
            e,
            r,
            i = this.fonts.length,
            s = i;
          for (t = 0; t < i; t += 1)
            if (this.fonts[t].loaded) s -= 1;
            else if ('t' === this.fonts[t].fOrigin || 2 === this.fonts[t].origin) {
              if (window.Typekit && window.Typekit.load && 0 === this.typekitLoaded) {
                this.typekitLoaded = 1;
                try {
                  window.Typekit.load({
                    async: !0,
                    active: function () {
                      this.typekitLoaded = 2;
                    }.bind(this),
                  });
                } catch (a) {}
              }
              2 === this.typekitLoaded && (this.fonts[t].loaded = !0);
            } else
              'n' === this.fonts[t].fOrigin || 0 === this.fonts[t].origin
                ? (this.fonts[t].loaded = !0)
                : ((e = this.fonts[t].monoCase.node),
                  (r = this.fonts[t].monoCase.w),
                  e.offsetWidth !== r ? ((s -= 1), (this.fonts[t].loaded = !0)) : ((e = this.fonts[t].sansCase.node), (r = this.fonts[t].sansCase.w), e.offsetWidth !== r && ((s -= 1), (this.fonts[t].loaded = !0))),
                  this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
          0 !== s && Date.now() - this.initTime < p
            ? setTimeout(this.checkLoadedFonts.bind(this), 20)
            : setTimeout(
                function () {
                  this.isLoaded = !0;
                }.bind(this),
                0
              );
        }
        function r(t, e) {
          var r = createNS('text');
          (r.style.fontSize = '100px'),
            r.setAttribute('font-family', e.fFamily),
            r.setAttribute('font-style', e.fStyle),
            r.setAttribute('font-weight', e.fWeight),
            (r.textContent = '1'),
            e.fClass ? ((r.style.fontFamily = 'inherit'), (r.className = e.fClass)) : (r.style.fontFamily = e.fFamily),
            t.appendChild(r);
          var i = createTag('canvas').getContext('2d');
          return (i.font = e.fWeight + ' ' + e.fStyle + ' 100px ' + e.fFamily), r;
        }
        function i(e, i) {
          if (!e) return void (this.isLoaded = !0);
          if (this.chars) return (this.isLoaded = !0), void (this.fonts = e.list);
          var s,
            a = e.list,
            n = a.length,
            o = n;
          for (s = 0; s < n; s += 1) {
            var h,
              l,
              p = !0;
            if (((a[s].loaded = !1), (a[s].monoCase = t(a[s].fFamily, 'monospace')), (a[s].sansCase = t(a[s].fFamily, 'sans-serif')), a[s].fPath)) {
              if ('p' === a[s].fOrigin || 3 === a[s].origin) {
                if (((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[s].fFamily + '"], style[f-origin="3"][f-family="' + a[s].fFamily + '"]')), h.length > 0 && (p = !1), p)) {
                  var f = createTag('style');
                  f.setAttribute('f-forigin', a[s].fOrigin),
                    f.setAttribute('f-origin', a[s].origin),
                    f.setAttribute('f-family', a[s].fFamily),
                    (f.type = 'text/css'),
                    (f.innerHTML = '@font-face {font-family: ' + a[s].fFamily + "; font-style: normal; src: url('" + a[s].fPath + "');}"),
                    i.appendChild(f);
                }
              } else if ('g' === a[s].fOrigin || 1 === a[s].origin) {
                for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) h[l].href.indexOf(a[s].fPath) !== -1 && (p = !1);
                if (p) {
                  var m = createTag('link');
                  m.setAttribute('f-forigin', a[s].fOrigin), m.setAttribute('f-origin', a[s].origin), (m.type = 'text/css'), (m.rel = 'stylesheet'), (m.href = a[s].fPath), document.body.appendChild(m);
                }
              } else if ('t' === a[s].fOrigin || 2 === a[s].origin) {
                for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) a[s].fPath === h[l].src && (p = !1);
                if (p) {
                  var c = createTag('script');
                  c.setAttribute('f-forigin', a[s].fOrigin), c.setAttribute('f-origin', a[s].origin), c.setAttribute('src', a[s].fPath), i.appendChild(c);
                }
              }
            } else (a[s].loaded = !0), (o -= 1);
            (a[s].helper = r(i, a[s])), (a[s].cache = {}), this.fonts.push(a[s]);
          }
          0 === o ? (this.isLoaded = !0) : setTimeout(this.checkLoadedFonts.bind(this), 100);
        }
        function s(t) {
          if (t) {
            this.chars || (this.chars = []);
            var e,
              r,
              i,
              s = t.length,
              a = this.chars.length;
            for (e = 0; e < s; e += 1) {
              for (r = 0, i = !1; r < a; ) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), (r += 1);
              i || (this.chars.push(t[e]), (a += 1));
            }
          }
        }
        function a(t, e, r) {
          for (var i = 0, s = this.chars.length; i < s; ) {
            if (this.chars[i].ch === t && this.chars[i].style === e && this.chars[i].fFamily === r) return this.chars[i];
            i += 1;
          }
          return console && console.warn && console.warn('Missing character from exported characters list: ', t, e, r), f;
        }
        function n(t, e, r) {
          var i = this.getFontByName(e),
            s = t.charCodeAt(0);
          if (!i.cache[s + 1]) {
            var a = i.helper;
            if (' ' === t) {
              a.textContent = '|' + t + '|';
              var n = a.getComputedTextLength();
              a.textContent = '||';
              var o = a.getComputedTextLength();
              i.cache[s + 1] = (n - o) / 100;
            } else (a.textContent = t), (i.cache[s + 1] = a.getComputedTextLength() / 100);
          }
          return i.cache[s + 1] * r;
        }
        function o(t) {
          for (var e = 0, r = this.fonts.length; e < r; ) {
            if (this.fonts[e].fName === t) return this.fonts[e];
            e += 1;
          }
          return this.fonts[0];
        }
        function h() {
          return m;
        }
        function l() {
          return this.isLoaded;
        }
        var p = 5e3,
          f = { w: 0, size: 0, shapes: [] },
          m = [];
        m = m.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
        var c = function () {
          (this.fonts = []), (this.chars = null), (this.typekitLoaded = 0), (this.isLoaded = !1), (this.initTime = Date.now());
        };
        return (
          (c.getCombinedCharacterCodes = h), (c.prototype.addChars = s), (c.prototype.addFonts = i), (c.prototype.getCharData = a), (c.prototype.getFontByName = o), (c.prototype.measureText = n), (c.prototype.checkLoadedFonts = e), (c.prototype.loaded = l), c
        );
      })(),
      PropertyFactory = (function () {
        function t(t, s) {
          var a,
            n = this.offsetTime;
          'multidimensional' === this.propType && (a = createTypedArray('float32', this.pv.length));
          for (var o, h, l = s.lastIndex, p = l, f = this.keyframes.length - 1, m = !0; m; ) {
            if (((o = this.keyframes[p]), (h = this.keyframes[p + 1]), p === f - 1 && t >= h.t - n)) {
              o.h && (o = h), (l = 0);
              break;
            }
            if (h.t - n > t) {
              l = p;
              break;
            }
            p < f - 1 ? (p += 1) : ((l = 0), (m = !1));
          }
          var c,
            d,
            u,
            y,
            g,
            v,
            b = h.t - n,
            x = o.t - n;
          if (o.to) {
            o.bezierData || bez.buildBezierData(o);
            var E = o.bezierData;
            if (t >= b || t < x) {
              var P = t >= b ? E.points.length - 1 : 0;
              for (d = E.points[P].point.length, c = 0; c < d; c += 1) a[c] = E.points[P].point[c];
            } else {
              o.__fnct ? (v = o.__fnct) : ((v = BezierFactory.getBezierEasing(o.o.x, o.o.y, o.i.x, o.i.y, o.n).get), (o.__fnct = v)), (u = v((t - x) / (b - x)));
              var S,
                _ = E.segmentLength * u,
                C = s.lastFrame < t && s._lastBezierData === E ? s._lastAddedLength : 0;
              for (g = s.lastFrame < t && s._lastBezierData === E ? s._lastPoint : 0, m = !0, y = E.points.length; m; ) {
                if (((C += E.points[g].partialLength), 0 === _ || 0 === u || g === E.points.length - 1)) {
                  for (d = E.points[g].point.length, c = 0; c < d; c += 1) a[c] = E.points[g].point[c];
                  break;
                }
                if (_ >= C && _ < C + E.points[g + 1].partialLength) {
                  for (S = (_ - C) / E.points[g + 1].partialLength, d = E.points[g].point.length, c = 0; c < d; c += 1) a[c] = E.points[g].point[c] + (E.points[g + 1].point[c] - E.points[g].point[c]) * S;
                  break;
                }
                g < y - 1 ? (g += 1) : (m = !1);
              }
              (s._lastPoint = g), (s._lastAddedLength = C - E.points[g].partialLength), (s._lastBezierData = E);
            }
          } else {
            var A, T, k, M, D;
            if (((f = o.s.length), this.sh && 1 !== o.h))
              if (t >= b) (a[0] = o.e[0]), (a[1] = o.e[1]), (a[2] = o.e[2]);
              else if (t <= x) (a[0] = o.s[0]), (a[1] = o.s[1]), (a[2] = o.s[2]);
              else {
                var w = i(o.s),
                  F = i(o.e),
                  I = (t - x) / (b - x);
                r(a, e(w, F, I));
              }
            else
              for (p = 0; p < f; p += 1)
                1 !== o.h &&
                  (t >= b
                    ? (u = 1)
                    : t < x
                    ? (u = 0)
                    : (o.o.x.constructor === Array
                        ? (o.__fnct || (o.__fnct = []),
                          o.__fnct[p] ? (v = o.__fnct[p]) : ((A = o.o.x[p] || o.o.x[0]), (T = o.o.y[p] || o.o.y[0]), (k = o.i.x[p] || o.i.x[0]), (M = o.i.y[p] || o.i.y[0]), (v = BezierFactory.getBezierEasing(A, T, k, M).get), (o.__fnct[p] = v)))
                        : o.__fnct
                        ? (v = o.__fnct)
                        : ((A = o.o.x), (T = o.o.y), (k = o.i.x), (M = o.i.y), (v = BezierFactory.getBezierEasing(A, T, k, M).get), (o.__fnct = v)),
                      (u = v((t - x) / (b - x))))),
                  (D = 1 === o.h ? o.s[p] : o.s[p] + (o.e[p] - o.s[p]) * u),
                  1 === f ? (a = D) : (a[p] = D);
          }
          return (s.lastIndex = l), a;
        }
        function e(t, e, r) {
          var i,
            s,
            a,
            n,
            o,
            h = [],
            l = t[0],
            p = t[1],
            f = t[2],
            m = t[3],
            c = e[0],
            d = e[1],
            u = e[2],
            y = e[3];
          return (
            (s = l * c + p * d + f * u + m * y),
            s < 0 && ((s = -s), (c = -c), (d = -d), (u = -u), (y = -y)),
            1 - s > 1e-6 ? ((i = Math.acos(s)), (a = Math.sin(i)), (n = Math.sin((1 - r) * i) / a), (o = Math.sin(r * i) / a)) : ((n = 1 - r), (o = r)),
            (h[0] = n * l + o * c),
            (h[1] = n * p + o * d),
            (h[2] = n * f + o * u),
            (h[3] = n * m + o * y),
            h
          );
        }
        function r(t, e) {
          var r = e[0],
            i = e[1],
            s = e[2],
            a = e[3],
            n = Math.atan2(2 * i * a - 2 * r * s, 1 - 2 * i * i - 2 * s * s),
            o = Math.asin(2 * r * i + 2 * s * a),
            h = Math.atan2(2 * r * a - 2 * i * s, 1 - 2 * r * r - 2 * s * s);
          (t[0] = n / degToRads), (t[1] = o / degToRads), (t[2] = h / degToRads);
        }
        function i(t) {
          var e = t[0] * degToRads,
            r = t[1] * degToRads,
            i = t[2] * degToRads,
            s = Math.cos(e / 2),
            a = Math.cos(r / 2),
            n = Math.cos(i / 2),
            o = Math.sin(e / 2),
            h = Math.sin(r / 2),
            l = Math.sin(i / 2),
            p = s * a * n - o * h * l,
            f = o * h * n + s * a * l,
            m = o * a * n + s * h * l,
            c = s * h * n - o * a * l;
          return [f, m, c, p];
        }
        function s() {
          var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
          if (!(t === this._caching.lastFrame || (this._caching.lastFrame !== c && ((this._caching.lastFrame >= r && t >= r) || (this._caching.lastFrame < e && t < e))))) {
            this._caching.lastFrame >= t && ((this._caching._lastBezierData = null), (this._caching.lastIndex = 0));
            var i = this.interpolateValue(t, this._caching);
            this.pv = i;
          }
          return (this._caching.lastFrame = t), this.pv;
        }
        function a(t) {
          var e;
          if ('unidimensional' === this.propType) (e = t * this.mult), d(this.v - e) > 1e-5 && ((this.v = e), (this._mdf = !0));
          else for (var r = 0, i = this.v.length; r < i; ) (e = t[r] * this.mult), d(this.v[r] - e) > 1e-5 && ((this.v[r] = e), (this._mdf = !0)), (r += 1);
        }
        function n() {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) {
            if (this.lock) return void this.setVValue(this.pv);
            (this.lock = !0), (this._mdf = this._isFirstFrame);
            var t,
              e = this.effectsSequence.length,
              r = this.kf ? this.pv : this.data.k;
            for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
            this.setVValue(r), (this._isFirstFrame = !1), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
          }
        }
        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function h(t, e, r, i) {
          (this.propType = 'unidimensional'),
            (this.mult = r || 1),
            (this.data = e),
            (this.v = r ? e.k * r : e.k),
            (this.pv = e.k),
            (this._mdf = !1),
            (this.elem = t),
            (this.container = i),
            (this.comp = t.comp),
            (this.k = !1),
            (this.kf = !1),
            (this.vel = 0),
            (this.effectsSequence = []),
            (this._isFirstFrame = !0),
            (this.getValue = n),
            (this.setVValue = a),
            (this.addEffect = o);
        }
        function l(t, e, r, i) {
          (this.propType = 'multidimensional'), (this.mult = r || 1), (this.data = e), (this._mdf = !1), (this.elem = t), (this.container = i), (this.comp = t.comp), (this.k = !1), (this.kf = !1), (this.frameId = -1);
          var s,
            h = e.k.length;
          (this.v = createTypedArray('float32', h)), (this.pv = createTypedArray('float32', h));
          createTypedArray('float32', h);
          for (this.vel = createTypedArray('float32', h), s = 0; s < h; s += 1) (this.v[s] = e.k[s] * this.mult), (this.pv[s] = e.k[s]);
          (this._isFirstFrame = !0), (this.effectsSequence = []), (this.getValue = n), (this.setVValue = a), (this.addEffect = o);
        }
        function p(e, r, i, h) {
          (this.propType = 'unidimensional'),
            (this.keyframes = r.k),
            (this.offsetTime = e.data.st),
            (this.frameId = -1),
            (this._caching = { lastFrame: c, lastIndex: 0, value: 0, _lastBezierData: null }),
            (this.k = !0),
            (this.kf = !0),
            (this.data = r),
            (this.mult = i || 1),
            (this.elem = e),
            (this.container = h),
            (this.comp = e.comp),
            (this.v = c),
            (this.pv = c),
            (this._isFirstFrame = !0),
            (this.getValue = n),
            (this.setVValue = a),
            (this.interpolateValue = t),
            (this.effectsSequence = [s.bind(this)]),
            (this.addEffect = o);
        }
        function f(e, r, i, h) {
          this.propType = 'multidimensional';
          var l,
            p,
            f,
            m,
            d,
            u = r.k.length;
          for (l = 0; l < u - 1; l += 1)
            r.k[l].to &&
              r.k[l].s &&
              r.k[l].e &&
              ((p = r.k[l].s),
              (f = r.k[l].e),
              (m = r.k[l].to),
              (d = r.k[l].ti),
              ((2 === p.length && (p[0] !== f[0] || p[1] !== f[1]) && bez.pointOnLine2D(p[0], p[1], f[0], f[1], p[0] + m[0], p[1] + m[1]) && bez.pointOnLine2D(p[0], p[1], f[0], f[1], f[0] + d[0], f[1] + d[1])) ||
                (3 === p.length &&
                  (p[0] !== f[0] || p[1] !== f[1] || p[2] !== f[2]) &&
                  bez.pointOnLine3D(p[0], p[1], p[2], f[0], f[1], f[2], p[0] + m[0], p[1] + m[1], p[2] + m[2]) &&
                  bez.pointOnLine3D(p[0], p[1], p[2], f[0], f[1], f[2], f[0] + d[0], f[1] + d[1], f[2] + d[2]))) &&
                ((r.k[l].to = null), (r.k[l].ti = null)),
              p[0] === f[0] && p[1] === f[1] && 0 === m[0] && 0 === m[1] && 0 === d[0] && 0 === d[1] && (2 === p.length || (p[2] === f[2] && 0 === m[2] && 0 === d[2])) && ((r.k[l].to = null), (r.k[l].ti = null)));
          (this.effectsSequence = [s.bind(this)]),
            (this.keyframes = r.k),
            (this.offsetTime = e.data.st),
            (this.k = !0),
            (this.kf = !0),
            (this._isFirstFrame = !0),
            (this.mult = i || 1),
            (this.elem = e),
            (this.container = h),
            (this.comp = e.comp),
            (this.getValue = n),
            (this.setVValue = a),
            (this.interpolateValue = t),
            (this.frameId = -1);
          var y = r.k[0].s.length;
          for (this.v = createTypedArray('float32', y), this.pv = createTypedArray('float32', y), l = 0; l < y; l += 1) (this.v[l] = c), (this.pv[l] = c);
          (this._caching = { lastFrame: c, lastIndex: 0, value: createTypedArray('float32', y) }), (this.addEffect = o);
        }
        function m(t, e, r, i, s) {
          var a;
          if (0 === e.a) a = 0 === r ? new h(t, e, i, s) : new l(t, e, i, s);
          else if (1 === e.a) a = 0 === r ? new p(t, e, i, s) : new f(t, e, i, s);
          else if (e.k.length)
            if ('number' == typeof e.k[0]) a = new l(t, e, i, s);
            else
              switch (r) {
                case 0:
                  a = new p(t, e, i, s);
                  break;
                case 1:
                  a = new f(t, e, i, s);
              }
          else a = new h(t, e, i, s);
          return a.effectsSequence.length && s.addDynamicProperty(a), a;
        }
        var c = initialDefaultFrame,
          d = Math.abs,
          u = { getProp: m };
        return u;
      })(),
      TransformPropertyFactory = (function () {
        function t(t) {
          var e = this._mdf;
          this.iterateDynamicProperties(),
            (this._mdf = this._mdf || e),
            this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
            this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
            this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
            this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
            this.data.p.s ? (this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0)) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
        }
        function e(t) {
          if (this.elem.globalData.frameId !== this.frameId) {
            if ((this._isDirty && (this.precalculateMatrix(), (this._isDirty = !1)), this.iterateDynamicProperties(), this._mdf || t)) {
              if (
                (this.v.cloneFromProps(this.pre.props),
                this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                this.r && this.appliedTransformations < 4
                  ? this.v.rotate(-this.r.v)
                  : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                this.autoOriented)
              ) {
                var e,
                  r,
                  i = this.elem.globalData.frameRate;
                if (this.p && this.p.keyframes && this.p.getValueAtTime)
                  this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t
                    ? ((e = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / i, 0)), (r = this.p.getValueAtTime(this.p.keyframes[0].t / i, 0)))
                    : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t
                    ? ((e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i, 0)), (r = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.01) / i, 0)))
                    : ((e = this.p.pv), (r = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / i, this.p.offsetTime)));
                else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                  (e = []), (r = []);
                  var i,
                    s = this.px,
                    a = this.py;
                  s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t
                    ? ((e[0] = s.getValueAtTime((s.keyframes[0].t + 0.01) / i, 0)), (e[1] = a.getValueAtTime((a.keyframes[0].t + 0.01) / i, 0)), (r[0] = s.getValueAtTime(s.keyframes[0].t / i, 0)), (r[1] = a.getValueAtTime(a.keyframes[0].t / i, 0)))
                    : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t
                    ? ((e[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / i, 0)),
                      (e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i, 0)),
                      (r[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - 0.01) / i, 0)),
                      (r[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - 0.01) / i, 0)))
                    : ((e = [s.pv, a.pv]), (r[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - 0.01) / i, s.offsetTime)), (r[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - 0.01) / i, a.offsetTime)));
                }
                this.v.rotate(-Math.atan2(e[1] - r[1], e[0] - r[0]));
              }
              this.data.p.s ? (this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0)) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            }
            this.frameId = this.elem.globalData.frameId;
          }
        }
        function r() {
          if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), (this.appliedTransformations = 1), !this.s.effectsSequence.length)) {
            if ((this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), (this.appliedTransformations = 2), this.sk)) {
              if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
              this.pre.skewFromAxis(-this.sk.v, this.sa.v), (this.appliedTransformations = 3);
            }
            if (this.r) {
              if (this.r.effectsSequence.length) return;
              this.pre.rotate(-this.r.v), (this.appliedTransformations = 4);
            } else
              this.rz.effectsSequence.length ||
                this.ry.effectsSequence.length ||
                this.rx.effectsSequence.length ||
                this.or.effectsSequence.length ||
                (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), (this.appliedTransformations = 4));
          }
        }
        function i() {}
        function s(t) {
          this._addDynamicProperty(t), this.elem.addDynamicProperty(t), (this._isDirty = !0);
        }
        function a(t, e, r) {
          if (
            ((this.elem = t),
            (this.frameId = -1),
            (this.propType = 'transform'),
            (this.data = e),
            (this.v = new Matrix()),
            (this.pre = new Matrix()),
            (this.appliedTransformations = 0),
            this.initDynamicPropertyContainer(r || t),
            e.p.s
              ? ((this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this)), (this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this)), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this)))
              : (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
            e.r)
          )
            this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this);
          else if (e.rx) {
            if (((this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this)), (this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this)), (this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this)), e.or.k[0].ti)) {
              var i,
                s = e.or.k.length;
              for (i = 0; i < s; i += 1) e.or.k[i].to = e.or.k[i].ti = null;
            }
            (this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this)), (this.or.sh = !0);
          }
          e.sk && ((this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this)), (this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this))),
            e.a && (this.a = PropertyFactory.getProp(t, e.a, 1, 0, this)),
            e.s && (this.s = PropertyFactory.getProp(t, e.s, 1, 0.01, this)),
            e.o ? (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, t)) : (this.o = { _mdf: !1, v: 1 }),
            (this._isDirty = !0),
            this.dynamicProperties.length || this.getValue(!0);
        }
        function n(t, e, r) {
          return new a(t, e, r);
        }
        return (
          (a.prototype = { applyToMatrix: t, getValue: e, precalculateMatrix: r, autoOrient: i }),
          extendPrototype([DynamicPropertyContainer], a),
          (a.prototype.addDynamicProperty = s),
          (a.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty),
          { getTransformProperty: n }
        );
      })();
    (ShapePath.prototype.setPathData = function (t, e) {
      (this.c = t), this.setLength(e);
      for (var r = 0; r < e; ) (this.v[r] = point_pool.newElement()), (this.o[r] = point_pool.newElement()), (this.i[r] = point_pool.newElement()), (r += 1);
    }),
      (ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t; ) this.doubleArrayLength();
        this._length = t;
      }),
      (ShapePath.prototype.doubleArrayLength = function () {
        (this.v = this.v.concat(createSizedArray(this._maxLength))), (this.i = this.i.concat(createSizedArray(this._maxLength))), (this.o = this.o.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2);
      }),
      (ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
        var a;
        switch (((this._length = Math.max(this._length, i + 1)), this._length >= this._maxLength && this.doubleArrayLength(), r)) {
          case 'v':
            a = this.v;
            break;
          case 'i':
            a = this.i;
            break;
          case 'o':
            a = this.o;
        }
        (!a[i] || (a[i] && !s)) && (a[i] = point_pool.newElement()), (a[i][0] = t), (a[i][1] = e);
      }),
      (ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
        this.setXYAt(t, e, 'v', n, o), this.setXYAt(r, i, 'o', n, o), this.setXYAt(s, a, 'i', n, o);
      }),
      (ShapePath.prototype.reverse = function () {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v,
          r = this.o,
          i = this.i,
          s = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), (s = 1));
        var a,
          n = this._length - 1,
          o = this._length;
        for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), (n -= 1);
        return t;
      });
    var ShapePropertyFactory = (function () {
        function t(t, e, r) {
          var i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f,
            m = r.lastIndex,
            c = this.keyframes;
          if (t < c[0].t - this.offsetTime) (i = c[0].s[0]), (a = !0), (m = 0);
          else if (t >= c[c.length - 1].t - this.offsetTime) (i = 1 === c[c.length - 2].h ? c[c.length - 1].s[0] : c[c.length - 2].e[0]), (a = !0);
          else {
            for (var d, u, y = m, g = c.length - 1, v = !0; v && ((d = c[y]), (u = c[y + 1]), !(u.t - this.offsetTime > t)); ) y < g - 1 ? (y += 1) : (v = !1);
            if (((a = 1 === d.h), (m = y), !a)) {
              if (t >= u.t - this.offsetTime) p = 1;
              else if (t < d.t - this.offsetTime) p = 0;
              else {
                var b;
                d.__fnct ? (b = d.__fnct) : ((b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get), (d.__fnct = b)), (p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime))));
              }
              s = d.e[0];
            }
            i = d.s[0];
          }
          for (h = e._length, l = i.i[0].length, r.lastIndex = m, n = 0; n < h; n += 1)
            for (o = 0; o < l; o += 1)
              (f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p), (e.i[n][o] = f), (f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p), (e.o[n][o] = f), (f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p), (e.v[n][o] = f);
        }
        function e() {
          var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
            i = this._caching.lastFrame;
          return (i !== m && ((i < e && t < e) || (i > r && t > r))) || ((this._caching.lastIndex = i < t ? this._caching.lastIndex : 0), this.interpolateShape(t, this.pv, this._caching)), (this._caching.lastFrame = t), this.pv;
        }
        function r() {
          this.paths = this.localShapeCollection;
        }
        function i(t, e) {
          if (t._length !== e._length || t.c !== e.c) return !1;
          var r,
            i = t._length;
          for (r = 0; r < i; r += 1) if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
          return !0;
        }
        function s(t) {
          i(this.v, t) || ((this.v = shape_pool.clone(t)), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), (this._mdf = !0), (this.paths = this.localShapeCollection));
        }
        function a() {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) {
            if (this.lock) return void this.setVValue(this.pv);
            (this.lock = !0), (this._mdf = !1);
            var t,
              e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
              r = this.effectsSequence.length;
            for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);
            this.setVValue(e), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
          }
        }
        function n(t, e, i) {
          (this.propType = 'shape'), (this.comp = t.comp), (this.container = t), (this.elem = t), (this.data = e), (this.k = !1), (this.kf = !1), (this._mdf = !1);
          var s = 3 === i ? e.pt.k : e.ks.k;
          (this.v = shape_pool.clone(s)),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.reset = r),
            (this.effectsSequence = []);
        }
        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function h(t, i, s) {
          (this.propType = 'shape'), (this.comp = t.comp), (this.elem = t), (this.container = t), (this.offsetTime = t.data.st), (this.keyframes = 3 === s ? i.pt.k : i.ks.k), (this.k = !0), (this.kf = !0);
          var a = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          (this.v = shape_pool.newElement()),
            this.v.setPathData(this.keyframes[0].s[0].c, a),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.lastFrame = m),
            (this.reset = r),
            (this._caching = { lastFrame: m, lastIndex: 0 }),
            (this.effectsSequence = [e.bind(this)]);
        }
        function l(t, e, r) {
          var i;
          if (3 === r || 4 === r) {
            var s = 3 === r ? e.pt : e.ks,
              a = s.k;
            i = 1 === s.a || a.length ? new h(t, e, r) : new n(t, e, r);
          } else 5 === r ? (i = new u(t, e)) : 6 === r ? (i = new c(t, e)) : 7 === r && (i = new d(t, e));
          return i.k && t.addDynamicProperty(i), i;
        }
        function p() {
          return n;
        }
        function f() {
          return h;
        }
        var m = -999999;
        (n.prototype.interpolateShape = t), (n.prototype.getValue = a), (n.prototype.setVValue = s), (n.prototype.addEffect = o), (h.prototype.getValue = a), (h.prototype.interpolateShape = t), (h.prototype.setVValue = s), (h.prototype.addEffect = o);
        var c = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 4),
                (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.localShapeCollection.addShape(this.v),
                (this.d = e.d),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertEllToPath());
            }
            var e = roundCorner;
            return (
              (t.prototype = {
                reset: r,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
                },
                convertEllToPath: function () {
                  var t = this.p.v[0],
                    r = this.p.v[1],
                    i = this.s.v[0] / 2,
                    s = this.s.v[1] / 2,
                    a = 3 !== this.d,
                    n = this.v;
                  (n.v[0][0] = t),
                    (n.v[0][1] = r - s),
                    (n.v[1][0] = a ? t + i : t - i),
                    (n.v[1][1] = r),
                    (n.v[2][0] = t),
                    (n.v[2][1] = r + s),
                    (n.v[3][0] = a ? t - i : t + i),
                    (n.v[3][1] = r),
                    (n.i[0][0] = a ? t - i * e : t + i * e),
                    (n.i[0][1] = r - s),
                    (n.i[1][0] = a ? t + i : t - i),
                    (n.i[1][1] = r - s * e),
                    (n.i[2][0] = a ? t + i * e : t - i * e),
                    (n.i[2][1] = r + s),
                    (n.i[3][0] = a ? t - i : t + i),
                    (n.i[3][1] = r + s * e),
                    (n.o[0][0] = a ? t + i * e : t - i * e),
                    (n.o[0][1] = r - s),
                    (n.o[1][0] = a ? t + i : t - i),
                    (n.o[1][1] = r + s * e),
                    (n.o[2][0] = a ? t - i * e : t + i * e),
                    (n.o[2][1] = r + s),
                    (n.o[3][0] = a ? t - i : t + i),
                    (n.o[3][1] = r - s * e);
                },
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          d = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 0),
                (this.elem = t),
                (this.comp = t.comp),
                (this.data = e),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                1 === e.sy ? ((this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this)), (this.is = PropertyFactory.getProp(t, e.is, 0, 0.01, this)), (this.convertToPath = this.convertStarToPath)) : (this.convertToPath = this.convertPolygonToPath),
                (this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this)),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this)),
                (this.or = PropertyFactory.getProp(t, e.or, 0, 0, this)),
                (this.os = PropertyFactory.getProp(t, e.os, 0, 0.01, this)),
                (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertToPath());
            }
            return (
              (t.prototype = {
                reset: r,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertToPath());
                },
                convertStarToPath: function () {
                  var t,
                    e,
                    r,
                    i,
                    s = 2 * Math.floor(this.pt.v),
                    a = (2 * Math.PI) / s,
                    n = !0,
                    o = this.or.v,
                    h = this.ir.v,
                    l = this.os.v,
                    p = this.is.v,
                    f = (2 * Math.PI * o) / (2 * s),
                    m = (2 * Math.PI * h) / (2 * s),
                    c = -Math.PI / 2;
                  c += this.r.v;
                  var d = 3 === this.data.d ? -1 : 1;
                  for (this.v._length = 0, t = 0; t < s; t += 1) {
                    (e = n ? o : h), (r = n ? l : p), (i = n ? f : m);
                    var u = e * Math.cos(c),
                      y = e * Math.sin(c),
                      g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                      v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                    (u += +this.p.v[0]), (y += +this.p.v[1]), this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), (n = !n), (c += a * d);
                  }
                },
                convertPolygonToPath: function () {
                  var t,
                    e = Math.floor(this.pt.v),
                    r = (2 * Math.PI) / e,
                    i = this.or.v,
                    s = this.os.v,
                    a = (2 * Math.PI * i) / (4 * e),
                    n = -Math.PI / 2,
                    o = 3 === this.data.d ? -1 : 1;
                  for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                    var h = i * Math.cos(n),
                      l = i * Math.sin(n),
                      p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                      f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                    (h += +this.p.v[0]), (l += +this.p.v[1]), this.v.setTripleAt(h, l, h - p * a * s * o, l - f * a * s * o, h + p * a * s * o, l + f * a * s * o, t, !0), (n += r * o);
                  }
                  (this.paths.length = 0), (this.paths[0] = this.v);
                },
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          u = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                (this.v.c = !0),
                (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, 0, this)),
                this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertRectToPath());
            }
            return (
              (t.prototype = {
                convertRectToPath: function () {
                  var t = this.p.v[0],
                    e = this.p.v[1],
                    r = this.s.v[0] / 2,
                    i = this.s.v[1] / 2,
                    s = bm_min(r, i, this.r.v),
                    a = s * (1 - roundCorner);
                  (this.v._length = 0),
                    2 === this.d || 1 === this.d
                      ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0),
                        this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0),
                        0 !== s
                          ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0),
                            this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0),
                            this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0),
                            this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0),
                            this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0),
                            this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0))
                          : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3)))
                      : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0),
                        0 !== s
                          ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0),
                            this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0),
                            this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0),
                            this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0),
                            this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0),
                            this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0),
                            this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0))
                          : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)));
                },
                getValue: function (t) {
                  this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
                },
                reset: r,
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          y = {};
        return (y.getShapeProp = l), (y.getConstructorFunction = p), (y.getKeyframedConstructorFunction = f), y;
      })(),
      ShapeModifiers = (function () {
        function t(t, e) {
          i[t] || (i[t] = e);
        }
        function e(t, e, r) {
          return new i[t](e, r);
        }
        var r = {},
          i = {};
        return (r.registerModifier = t), (r.getModifier = e), r;
      })();
    (ShapeModifier.prototype.initModifierProperties = function () {}),
      (ShapeModifier.prototype.addShapeToModifier = function () {}),
      (ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
          var e = { shape: t.sh, data: t, localShapeCollection: shapeCollection_pool.newShapeCollection() };
          this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
        }
      }),
      (ShapeModifier.prototype.init = function (t, e) {
        (this.shapes = []), (this.elem = t), this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), (this.frameId = initialDefaultFrame), (this.closed = !1), (this.k = !1), this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties());
      }),
      extendPrototype([DynamicPropertyContainer], ShapeModifier),
      extendPrototype([ShapeModifier], TrimModifier),
      (TrimModifier.prototype.initModifierProperties = function (t, e) {
        (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
          (this.sValue = 0),
          (this.eValue = 0),
          (this.getValue = this.processKeys),
          (this.m = e.m),
          (this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length);
      }),
      (TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }),
      (TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
        var a = [];
        e <= 1 ? a.push({ s: t, e: e }) : t >= 1 ? a.push({ s: t - 1, e: e - 1 }) : (a.push({ s: t, e: 1 }), a.push({ s: 0, e: e - 1 }));
        var n,
          o,
          h = [],
          l = a.length;
        for (n = 0; n < l; n += 1)
          if (((o = a[n]), o.e * s < i || o.s * s > i + r));
          else {
            var p, f;
            (p = o.s * s <= i ? 0 : (o.s * s - i) / r), (f = o.e * s >= i + r ? 1 : (o.e * s - i) / r), h.push([p, f]);
          }
        return h.length || h.push([0, 0]), h;
      }),
      (TrimModifier.prototype.releasePathsData = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);
        return (t.length = 0), t;
      }),
      (TrimModifier.prototype.processShapes = function (t) {
        var e, r;
        if (this._mdf || t) {
          var i = (this.o.v % 360) / 360;
          if ((i < 0 && (i += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + i), (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + i), e > r)) {
            var s = e;
            (e = r), (r = s);
          }
          (e = 1e-4 * Math.round(1e4 * e)), (r = 1e-4 * Math.round(1e4 * r)), (this.sValue = e), (this.eValue = r);
        } else (e = this.sValue), (r = this.eValue);
        var a,
          n,
          o,
          h,
          l,
          p,
          f,
          m = this.shapes.length,
          c = 0;
        if (r === e) for (n = 0; n < m; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), (this.shapes[n].shape._mdf = !0), (this.shapes[n].shape.paths = this.shapes[n].localShapeCollection);
        else if ((1 === r && 0 === e) || (0 === r && 1 === e)) {
          if (this._mdf) for (n = 0; n < m; n += 1) (this.shapes[n].pathsData.length = 0), (this.shapes[n].shape._mdf = !0);
        } else {
          var d,
            u,
            y = [];
          for (n = 0; n < m; n += 1)
            if (((d = this.shapes[n]), d.shape._mdf || this._mdf || t || 2 === this.m)) {
              if (((a = d.shape.paths), (h = a._length), (f = 0), !d.shape._mdf && d.pathsData.length)) f = d.totalShapeLength;
              else {
                for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) (p = bez.getSegmentsLength(a.shapes[o])), l.push(p), (f += p.totalLength);
                (d.totalShapeLength = f), (d.pathsData = l);
              }
              (c += f), (d.shape._mdf = !0);
            } else d.shape.paths = d.localShapeCollection;
          var g,
            v = e,
            b = r,
            x = 0;
          for (n = m - 1; n >= 0; n -= 1)
            if (((d = this.shapes[n]), d.shape._mdf)) {
              for (u = d.localShapeCollection, u.releaseShapes(), 2 === this.m && m > 1 ? ((g = this.calculateShapeEdges(e, r, d.totalShapeLength, x, c)), (x += d.totalShapeLength)) : (g = [[v, b]]), h = g.length, o = 0; o < h; o += 1) {
                (v = g[o][0]),
                  (b = g[o][1]),
                  (y.length = 0),
                  b <= 1
                    ? y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength * b })
                    : v >= 1
                    ? y.push({ s: d.totalShapeLength * (v - 1), e: d.totalShapeLength * (b - 1) })
                    : (y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength }), y.push({ s: 0, e: d.totalShapeLength * (b - 1) }));
                var E = this.addShapes(d, y[0]);
                if (y[0].s !== y[0].e) {
                  if (y.length > 1) {
                    var P = d.shape.paths.shapes[d.shape.paths._length - 1];
                    if (P.c) {
                      var S = E.pop();
                      this.addPaths(E, u), (E = this.addShapes(d, y[1], S));
                    } else this.addPaths(E, u), (E = this.addShapes(d, y[1]));
                  }
                  this.addPaths(E, u);
                }
              }
              d.shape.paths = u;
            }
        }
      }),
      (TrimModifier.prototype.addPaths = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1) e.addShape(t[r]);
      }),
      (TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
        s.setXYAt(e[0], e[1], 'o', a), s.setXYAt(r[0], r[1], 'i', a + 1), n && s.setXYAt(t[0], t[1], 'v', a), s.setXYAt(i[0], i[1], 'v', a + 1);
      }),
      (TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
        e.setXYAt(t[1], t[5], 'o', r), e.setXYAt(t[2], t[6], 'i', r + 1), i && e.setXYAt(t[0], t[4], 'v', r), e.setXYAt(t[3], t[7], 'v', r + 1);
      }),
      (TrimModifier.prototype.addShapes = function (t, e, r) {
        var i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          f = t.pathsData,
          m = t.shape.paths.shapes,
          c = t.shape.paths._length,
          d = 0,
          u = [],
          y = !0;
        for (r ? ((o = r._length), (p = r._length)) : ((r = shape_pool.newElement()), (o = 0), (p = 0)), u.push(r), i = 0; i < c; i += 1) {
          for (h = f[i].lengths, r.c = m[i].c, a = m[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1)
            if (((n = h[s - 1]), d + n.addedLength < e.s)) (d += n.addedLength), (r.c = !1);
            else {
              if (d > e.e) {
                r.c = !1;
                break;
              }
              e.s <= d && e.e >= d + n.addedLength
                ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[s], m[i].v[s], r, o, y), (y = !1))
                : ((l = bez.getNewSegment(m[i].v[s - 1], m[i].v[s], m[i].o[s - 1], m[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1])), this.addSegmentFromArray(l, r, o, y), (y = !1), (r.c = !1)),
                (d += n.addedLength),
                (o += 1);
            }
          if (m[i].c && h.length) {
            if (((n = h[s - 1]), d <= e.e)) {
              var g = h[s - 1].addedLength;
              e.s <= d && e.e >= d + g
                ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[0], m[i].v[0], r, o, y), (y = !1))
                : ((l = bez.getNewSegment(m[i].v[s - 1], m[i].v[0], m[i].o[s - 1], m[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1])), this.addSegmentFromArray(l, r, o, y), (y = !1), (r.c = !1));
            } else r.c = !1;
            (d += n.addedLength), (o += 1);
          }
          if ((r._length && (r.setXYAt(r.v[p][0], r.v[p][1], 'i', p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], 'o', r._length - 1)), d > e.e)) break;
          i < c - 1 && ((r = shape_pool.newElement()), (y = !0), u.push(r), (o = 0));
        }
        return u;
      }),
      ShapeModifiers.registerModifier('tm', TrimModifier),
      extendPrototype([ShapeModifier], RoundCornersModifier),
      (RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys), (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)), (this._isAnimated = !!this.rd.effectsSequence.length);
      }),
      (RoundCornersModifier.prototype.processPath = function (t, e) {
        var r = shape_pool.newElement();
        r.c = t.c;
        var i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          f,
          m,
          c,
          d,
          u,
          y = t._length,
          g = 0;
        for (i = 0; i < y; i += 1)
          (s = t.v[i]),
            (n = t.o[i]),
            (a = t.i[i]),
            s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1]
              ? (0 !== i && i !== y - 1) || t.c
                ? ((o = 0 === i ? t.v[y - 1] : t.v[i - 1]),
                  (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))),
                  (l = h ? Math.min(h / 2, e) / h : 0),
                  (p = d = s[0] + (o[0] - s[0]) * l),
                  (f = u = s[1] - (s[1] - o[1]) * l),
                  (m = p - (p - s[0]) * roundCorner),
                  (c = f - (f - s[1]) * roundCorner),
                  r.setTripleAt(p, f, m, c, d, u, g),
                  (g += 1),
                  (o = i === y - 1 ? t.v[0] : t.v[i + 1]),
                  (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))),
                  (l = h ? Math.min(h / 2, e) / h : 0),
                  (p = m = s[0] + (o[0] - s[0]) * l),
                  (f = c = s[1] + (o[1] - s[1]) * l),
                  (d = p - (p - s[0]) * roundCorner),
                  (u = f - (f - s[1]) * roundCorner),
                  r.setTripleAt(p, f, m, c, d, u, g),
                  (g += 1))
                : (r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), (g += 1))
              : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), (g += 1));
        return r;
      }),
      (RoundCornersModifier.prototype.processShapes = function (t) {
        var e,
          r,
          i,
          s,
          a = this.shapes.length,
          n = this.rd.v;
        if (0 !== n) {
          var o, h, l;
          for (r = 0; r < a; r += 1) {
            if (((o = this.shapes[r]), (h = o.shape.paths), (l = o.localShapeCollection), o.shape._mdf || this._mdf || t))
              for (l.releaseShapes(), o.shape._mdf = !0, e = o.shape.paths.shapes, s = o.shape.paths._length, i = 0; i < s; i += 1) l.addShape(this.processPath(e[i], n));
            o.shape.paths = o.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      }),
      ShapeModifiers.registerModifier('rd', RoundCornersModifier),
      extendPrototype([ShapeModifier], RepeaterModifier),
      (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys),
          (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
          (this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this)),
          (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
          (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
          (this.data = e),
          this.dynamicProperties.length || this.getValue(!0),
          (this._isAnimated = !!this.dynamicProperties.length),
          (this.pMatrix = new Matrix()),
          (this.rMatrix = new Matrix()),
          (this.sMatrix = new Matrix()),
          (this.tMatrix = new Matrix()),
          (this.matrix = new Matrix());
      }),
      (RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
        var n = a ? -1 : 1,
          o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
          h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]),
          e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
          e.rotate(-i.r.v * n * s),
          e.translate(i.a.v[0], i.a.v[1], i.a.v[2]),
          r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
          r.scale(a ? 1 / o : o, a ? 1 / h : h),
          r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }),
      (RepeaterModifier.prototype.init = function (t, e, r, i) {
        (this.elem = t), (this.arr = e), (this.pos = r), (this.elemsData = i), (this._currentCopies = 0), (this._elements = []), (this._groups = []), (this.frameId = -1), this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);
        for (var s = 0; r > 0; ) (r -= 1), this._elements.unshift(e[r]), (s += 1);
        this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (RepeaterModifier.prototype.resetElements = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) (t[e]._processed = !1), 'gr' === t[e].ty && this.resetElements(t[e].it);
      }),
      (RepeaterModifier.prototype.cloneElements = function (t) {
        var e = (t.length, JSON.parse(JSON.stringify(t)));
        return this.resetElements(e), e;
      }),
      (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1) (t[r]._render = e), 'gr' === t[r].ty && this.changeGroupRender(t[r].it, e);
      }),
      (RepeaterModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a;
        if (this._mdf || t) {
          var n = Math.ceil(this.c.v);
          if (this._groups.length < n) {
            for (; this._groups.length < n; ) {
              var o = { it: this.cloneElements(this._elements), ty: 'gr' };
              o.it.push({
                a: { a: 0, ix: 1, k: [0, 0] },
                nm: 'Transform',
                o: { a: 0, ix: 7, k: 100 },
                p: { a: 0, ix: 2, k: [0, 0] },
                r: {
                  a: 1,
                  ix: 6,
                  k: [
                    { s: 0, e: 0, t: 0 },
                    { s: 0, e: 0, t: 1 },
                  ],
                },
                s: { a: 0, ix: 3, k: [100, 100] },
                sa: { a: 0, ix: 5, k: 0 },
                sk: { a: 0, ix: 4, k: 0 },
                ty: 'tr',
              }),
                this.arr.splice(0, 0, o),
                this._groups.splice(0, 0, o),
                (this._currentCopies += 1);
            }
            this.elem.reloadShapes();
          }
          a = 0;
          var h;
          for (i = 0; i <= this._groups.length - 1; i += 1) (h = a < n), (this._groups[i]._render = h), this.changeGroupRender(this._groups[i].it, h), (a += 1);
          this._currentCopies = n;
          var l = this.o.v,
            p = l % 1,
            f = l > 0 ? Math.floor(l) : Math.ceil(l),
            m = (this.tr.v.props, this.pMatrix.props),
            c = this.rMatrix.props,
            d = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var u = 0;
          if (l > 0) {
            for (; u < f; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), (u += 1);
            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), (u += p));
          } else if (l < 0) {
            for (; u > f; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), (u -= 1);
            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), (u -= p));
          }
          (i = 1 === this.data.m ? 0 : this._currentCopies - 1), (s = 1 === this.data.m ? 1 : -1), (a = this._currentCopies);
          for (var y, g; a; ) {
            if (
              ((e = this.elemsData[i].it),
              (r = e[e.length - 1].transform.mProps.v.props),
              (g = r.length),
              (e[e.length - 1].transform.mProps._mdf = !0),
              (e[e.length - 1].transform.op._mdf = !0),
              (e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1))),
              0 !== u)
            ) {
              for (
                ((0 !== i && 1 === s) || (i !== this._currentCopies - 1 && s === -1)) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                  this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]),
                  this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]),
                  this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                  y = 0;
                y < g;
                y += 1
              )
                r[y] = this.matrix.props[y];
              this.matrix.reset();
            } else for (this.matrix.reset(), y = 0; y < g; y += 1) r[y] = this.matrix.props[y];
            (u += 1), (a -= 1), (i += s);
          }
        } else for (a = this._currentCopies, i = 0, s = 1; a; ) (e = this.elemsData[i].it), (r = e[e.length - 1].transform.mProps.v.props), (e[e.length - 1].transform.mProps._mdf = !1), (e[e.length - 1].transform.op._mdf = !1), (a -= 1), (i += s);
      }),
      (RepeaterModifier.prototype.addShape = function () {}),
      ShapeModifiers.registerModifier('rp', RepeaterModifier),
      (ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength && ((this.shapes = this.shapes.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2)), (this.shapes[this._length] = t), (this._length += 1);
      }),
      (ShapeCollection.prototype.releaseShapes = function () {
        var t;
        for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
        this._length = 0;
      }),
      (DashProperty.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), (this._mdf = this._mdf || t), this._mdf)) {
          var e = 0,
            r = this.dataProps.length;
          for ('svg' === this.renderer && (this.dashStr = ''), e = 0; e < r; e += 1)
            'o' != this.dataProps[e].n ? ('svg' === this.renderer ? (this.dashStr += ' ' + this.dataProps[e].p.v) : (this.dashArray[e] = this.dataProps[e].p.v)) : (this.dashoffset[0] = this.dataProps[e].p.v);
        }
      }),
      extendPrototype([DynamicPropertyContainer], DashProperty),
      (GradientProperty.prototype.comparePoints = function (t, e) {
        for (var r, i = 0, s = this.o.length / 2; i < s; ) {
          if (((r = Math.abs(t[4 * i] - t[4 * e + 2 * i])), r > 0.01)) return !1;
          i += 1;
        }
        return !0;
      }),
      (GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 !== this.c.length / 4) return !1;
        if (this.data.k.k[0].s)
          for (var t = 0, e = this.data.k.k.length; t < e; ) {
            if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
            t += 1;
          }
        else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }),
      (GradientProperty.prototype.getValue = function (t) {
        if ((this.prop.getValue(), (this._mdf = !1), (this._cmdf = !1), (this._omdf = !1), this.prop._mdf || t)) {
          var e,
            r,
            i,
            s = 4 * this.data.p;
          for (e = 0; e < s; e += 1) (r = e % 4 === 0 ? 100 : 255), (i = Math.round(this.prop.v[e] * r)), this.c[e] !== i && ((this.c[e] = i), (this._cmdf = !t));
          if (this.o.length)
            for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1)
              (r = e % 2 === 0 ? 100 : 1), (i = e % 2 === 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e]), this.o[e - 4 * this.data.p] !== i && ((this.o[e - 4 * this.data.p] = i), (this._omdf = !t));
          this._mdf = !t;
        }
      }),
      extendPrototype([DynamicPropertyContainer], GradientProperty);
    var buildShapeString = function (t, e, r, i) {
        if (0 === e) return '';
        var s,
          a = t.o,
          n = t.i,
          o = t.v,
          h = ' M' + i.applyToPointStringified(o[0][0], o[0][1]);
        for (s = 1; s < e; s += 1) h += ' C' + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + ' ' + i.applyToPointStringified(n[s][0], n[s][1]) + ' ' + i.applyToPointStringified(o[s][0], o[s][1]);
        return r && e && ((h += ' C' + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + ' ' + i.applyToPointStringified(n[0][0], n[0][1]) + ' ' + i.applyToPointStringified(o[0][0], o[0][1])), (h += 'z')), h;
      },
      ImagePreloader = (function () {
        function t() {
          (this.loadedAssets += 1), this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function e(t, e, r) {
          var i = '';
          if (t.e) i = t.p;
          else if (e) {
            var s = t.p;
            s.indexOf('images/') !== -1 && (s = s.split('/')[1]), (i = e + s);
          } else (i = r), (i += t.u ? t.u : ''), (i += t.p);
          return i;
        }
        function r(t) {
          var r = e(t, this.assetsPath, this.path),
            i = createTag('img');
          (i.crossOrigin = 'anonymous'),
            i.addEventListener('load', this._imageLoaded.bind(this), !1),
            i.addEventListener(
              'error',
              function () {
                (s.img = l), this._imageLoaded();
              }.bind(this),
              !1
            ),
            (i.src = r);
          var s = { img: i, assetData: t };
          return s;
        }
        function i(t, e) {
          this.imagesLoadedCb = e;
          var r,
            i = t.length;
          for (r = 0; r < i; r += 1) t[r].layers || ((this.totalImages += 1), this.images.push(this._createImageData(t[r])));
        }
        function s(t) {
          this.path = t || '';
        }
        function a(t) {
          this.assetsPath = t || '';
        }
        function n(t) {
          for (var e = 0, r = this.images.length; e < r; ) {
            if (this.images[e].assetData === t) return this.images[e].img;
            e += 1;
          }
        }
        function o() {
          (this.imagesLoadedCb = null), (this.images.length = 0);
        }
        function h() {
          return this.totalImages === this.loadedAssets;
        }
        var l = (function () {
          var t = createTag('canvas');
          (t.width = 1), (t.height = 1);
          var e = t.getContext('2d');
          return (e.fillStyle = '#FF0000'), e.fillRect(0, 0, 1, 1), t;
        })();
        return function () {
          (this.loadAssets = i),
            (this.setAssetsPath = a),
            (this.setPath = s),
            (this.loaded = h),
            (this.destroy = o),
            (this.getImage = n),
            (this._createImageData = r),
            (this._imageLoaded = t),
            (this.assetsPath = ''),
            (this.path = ''),
            (this.totalImages = 0),
            (this.loadedAssets = 0),
            (this.imagesLoadedCb = null),
            (this.images = []);
        };
      })(),
      featureSupport = (function () {
        var t = { maskType: !0 };
        return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t;
      })(),
      filtersFactory = (function () {
        function t(t) {
          var e = createNS('filter');
          return e.setAttribute('id', t), e.setAttribute('filterUnits', 'objectBoundingBox'), e.setAttribute('x', '0%'), e.setAttribute('y', '0%'), e.setAttribute('width', '100%'), e.setAttribute('height', '100%'), e;
        }
        function e() {
          var t = createNS('feColorMatrix');
          return t.setAttribute('type', 'matrix'), t.setAttribute('color-interpolation-filters', 'sRGB'), t.setAttribute('values', '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1'), t;
        }
        var r = {};
        return (r.createFilter = t), (r.createAlphaToLuminanceFilter = e), r;
      })(),
      assetLoader = (function () {
        function t(t) {
          return t.response && 'object' == typeof t.response ? t.response : t.response && 'string' == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
        }
        function e(e, r, i) {
          var s,
            a = new XMLHttpRequest();
          a.open('GET', e, !0),
            (a.responseType = 'json'),
            a.send(),
            (a.onreadystatechange = function () {
              if (4 == a.readyState)
                if (200 == a.status) (s = t(a)), r(s);
                else
                  try {
                    (s = t(a)), r(s);
                  } catch (e) {
                    i && i(e);
                  }
            });
        }
        return { load: e };
      })();
    (TextAnimatorProperty.prototype.searchProperties = function () {
      var t,
        e,
        r = this._textData.a.length,
        i = PropertyFactory.getProp;
      for (t = 0; t < r; t += 1) (e = this._textData.a[t]), (this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this));
      this._textData.p && 'm' in this._textData.p
        ? ((this._pathData = { f: i(this._elem, this._textData.p.f, 0, 0, this), l: i(this._elem, this._textData.p.l, 0, 0, this), r: this._textData.p.r, m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }), (this._hasMaskedPath = !0))
        : (this._hasMaskedPath = !1),
        (this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this));
    }),
      (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (((this.lettersChangedFlag = e), this._mdf || this._isFirstFrame || e || (this._hasMaskedPath && this._pathData.m._mdf))) {
          this._isFirstFrame = !1;
          var r,
            i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f,
            m,
            c,
            d,
            u,
            y,
            g,
            v,
            b,
            x,
            E = this._moreOptions.alignment.v,
            P = this._animatorsData,
            S = this._textData,
            _ = this.mHelper,
            C = this._renderType,
            A = this.renderedLetters.length,
            T = (this.data, t.l);
          if (this._hasMaskedPath) {
            if (((x = this._pathData.m), !this._pathData.n || this._pathData._mdf)) {
              var k = x.v;
              this._pathData.r && (k = k.reverse()), (n = { tLength: 0, segments: [] }), (a = k._length - 1);
              var M;
              for (g = 0, s = 0; s < a; s += 1)
                (M = { s: k.v[s], e: k.v[s + 1], to: [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]], ti: [k.i[s + 1][0] - k.v[s + 1][0], k.i[s + 1][1] - k.v[s + 1][1]] }),
                  bez.buildBezierData(M),
                  (n.tLength += M.bezierData.segmentLength),
                  n.segments.push(M),
                  (g += M.bezierData.segmentLength);
              (s = a),
                x.v.c &&
                  ((M = { s: k.v[s], e: k.v[0], to: [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]], ti: [k.i[0][0] - k.v[0][0], k.i[0][1] - k.v[0][1]] }),
                  bez.buildBezierData(M),
                  (n.tLength += M.bezierData.segmentLength),
                  n.segments.push(M),
                  (g += M.bezierData.segmentLength)),
                (this._pathData.pi = n);
            }
            if (((n = this._pathData.pi), (o = this._pathData.f.v), (m = 0), (f = 1), (l = 0), (p = !0), (u = n.segments), o < 0 && x.v.c))
              for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), m = u.length - 1, d = u[m].bezierData.points, f = d.length - 1; o < 0; ) (o += d[f].partialLength), (f -= 1), f < 0 && ((m -= 1), (d = u[m].bezierData.points), (f = d.length - 1));
            (d = u[m].bezierData.points), (c = d[f - 1]), (h = d[f]), (y = h.partialLength);
          }
          (a = T.length), (r = 0), (i = 0);
          var D,
            w,
            F,
            I,
            V,
            R = 1.2 * t.finalSize * 0.714,
            B = !0;
          I = P.length;
          var L,
            G,
            z,
            N,
            O,
            H,
            j,
            q,
            W,
            Y,
            X,
            K,
            $,
            J = -1,
            Z = o,
            U = m,
            Q = f,
            tt = -1,
            et = 0,
            rt = '',
            it = this.defaultPropsArray;
          if (2 === t.j || 1 === t.j) {
            var st = 0,
              at = 0,
              nt = 2 === t.j ? -0.5 : -1,
              ot = 0,
              ht = !0;
            for (s = 0; s < a; s += 1)
              if (T[s].n) {
                for (st && (st += at); ot < s; ) (T[ot].animatorJustifyOffset = st), (ot += 1);
                (st = 0), (ht = !0);
              } else {
                for (F = 0; F < I; F += 1) (D = P[F].a), D.t.propType && (ht && 2 === t.j && (at += D.t.v * nt), (w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), (st += L.length ? D.t.v * L[0] * nt : D.t.v * L * nt));
                ht = !1;
              }
            for (st && (st += at); ot < s; ) (T[ot].animatorJustifyOffset = st), (ot += 1);
          }
          for (s = 0; s < a; s += 1) {
            if ((_.reset(), (O = 1), T[s].n))
              (r = 0),
                (i += t.yOffset),
                (i += B ? 1 : 0),
                (o = Z),
                (B = !1),
                (et = 0),
                this._hasMaskedPath && ((m = U), (f = Q), (d = u[m].bezierData.points), (c = d[f - 1]), (h = d[f]), (y = h.partialLength), (l = 0)),
                ($ = Y = K = rt = ''),
                (it = this.defaultPropsArray);
            else {
              if (this._hasMaskedPath) {
                if (tt !== T[s].line) {
                  switch (t.j) {
                    case 1:
                      o += g - t.lineWidths[T[s].line];
                      break;
                    case 2:
                      o += (g - t.lineWidths[T[s].line]) / 2;
                  }
                  tt = T[s].line;
                }
                J !== T[s].ind && (T[J] && (o += T[J].extra), (o += T[s].an / 2), (J = T[s].ind)), (o += (E[0] * T[s].an) / 200);
                var lt = 0;
                for (F = 0; F < I; F += 1)
                  (D = P[F].a),
                    D.p.propType && ((w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), (lt += L.length ? D.p.v[0] * L[0] : D.p.v[0] * L)),
                    D.a.propType && ((w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), (lt += L.length ? D.a.v[0] * L[0] : D.a.v[0] * L));
                for (p = !0; p; )
                  l + y >= o + lt || !d
                    ? ((v = (o + lt - l) / h.partialLength), (z = c.point[0] + (h.point[0] - c.point[0]) * v), (N = c.point[1] + (h.point[1] - c.point[1]) * v), _.translate((-E[0] * T[s].an) / 200, -((E[1] * R) / 100)), (p = !1))
                    : d &&
                      ((l += h.partialLength),
                      (f += 1),
                      f >= d.length && ((f = 0), (m += 1), u[m] ? (d = u[m].bezierData.points) : x.v.c ? ((f = 0), (m = 0), (d = u[m].bezierData.points)) : ((l -= h.partialLength), (d = null))),
                      d && ((c = h), (h = d[f]), (y = h.partialLength)));
                (G = T[s].an / 2 - T[s].add), _.translate(-G, 0, 0);
              } else (G = T[s].an / 2 - T[s].add), _.translate(-G, 0, 0), _.translate((-E[0] * T[s].an) / 200, (-E[1] * R) / 100, 0);
              for (et += T[s].l / 2, F = 0; F < I; F += 1)
                (D = P[F].a), D.t.propType && ((w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), (0 === r && 0 === t.j) || (this._hasMaskedPath ? (o += L.length ? D.t.v * L[0] : D.t.v * L) : (r += L.length ? D.t.v * L[0] : D.t.v * L)));
              for (et += T[s].l / 2, t.strokeWidthAnim && (j = t.sw || 0), t.strokeColorAnim && (H = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (q = [t.fc[0], t.fc[1], t.fc[2]]), F = 0; F < I; F += 1)
                (D = P[F].a), D.a.propType && ((w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), L.length ? _.translate(-D.a.v[0] * L[0], -D.a.v[1] * L[1], D.a.v[2] * L[2]) : _.translate(-D.a.v[0] * L, -D.a.v[1] * L, D.a.v[2] * L));
              for (F = 0; F < I; F += 1)
                (D = P[F].a), D.s.propType && ((w = P[F].s), (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)), L.length ? _.scale(1 + (D.s.v[0] - 1) * L[0], 1 + (D.s.v[1] - 1) * L[1], 1) : _.scale(1 + (D.s.v[0] - 1) * L, 1 + (D.s.v[1] - 1) * L, 1));
              for (F = 0; F < I; F += 1) {
                if (
                  ((D = P[F].a),
                  (w = P[F].s),
                  (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)),
                  D.sk.propType && (L.length ? _.skewFromAxis(-D.sk.v * L[0], D.sa.v * L[1]) : _.skewFromAxis(-D.sk.v * L, D.sa.v * L)),
                  D.r.propType && (L.length ? _.rotateZ(-D.r.v * L[2]) : _.rotateZ(-D.r.v * L)),
                  D.ry.propType && (L.length ? _.rotateY(D.ry.v * L[1]) : _.rotateY(D.ry.v * L)),
                  D.rx.propType && (L.length ? _.rotateX(D.rx.v * L[0]) : _.rotateX(D.rx.v * L)),
                  D.o.propType && (O += L.length ? (D.o.v * L[0] - O) * L[0] : (D.o.v * L - O) * L),
                  t.strokeWidthAnim && D.sw.propType && (j += L.length ? D.sw.v * L[0] : D.sw.v * L),
                  t.strokeColorAnim && D.sc.propType)
                )
                  for (W = 0; W < 3; W += 1) L.length ? (H[W] = H[W] + (D.sc.v[W] - H[W]) * L[0]) : (H[W] = H[W] + (D.sc.v[W] - H[W]) * L);
                if (t.fillColorAnim && t.fc) {
                  if (D.fc.propType) for (W = 0; W < 3; W += 1) L.length ? (q[W] = q[W] + (D.fc.v[W] - q[W]) * L[0]) : (q[W] = q[W] + (D.fc.v[W] - q[W]) * L);
                  D.fh.propType && (q = L.length ? addHueToRGB(q, D.fh.v * L[0]) : addHueToRGB(q, D.fh.v * L)),
                    D.fs.propType && (q = L.length ? addSaturationToRGB(q, D.fs.v * L[0]) : addSaturationToRGB(q, D.fs.v * L)),
                    D.fb.propType && (q = L.length ? addBrightnessToRGB(q, D.fb.v * L[0]) : addBrightnessToRGB(q, D.fb.v * L));
                }
              }
              for (F = 0; F < I; F += 1)
                (D = P[F].a),
                  D.p.propType &&
                    ((w = P[F].s),
                    (L = w.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)),
                    this._hasMaskedPath
                      ? L.length
                        ? _.translate(0, D.p.v[1] * L[0], -D.p.v[2] * L[1])
                        : _.translate(0, D.p.v[1] * L, -D.p.v[2] * L)
                      : L.length
                      ? _.translate(D.p.v[0] * L[0], D.p.v[1] * L[1], -D.p.v[2] * L[2])
                      : _.translate(D.p.v[0] * L, D.p.v[1] * L, -D.p.v[2] * L));
              if (
                (t.strokeWidthAnim && (Y = j < 0 ? 0 : j),
                t.strokeColorAnim && (X = 'rgb(' + Math.round(255 * H[0]) + ',' + Math.round(255 * H[1]) + ',' + Math.round(255 * H[2]) + ')'),
                t.fillColorAnim && t.fc && (K = 'rgb(' + Math.round(255 * q[0]) + ',' + Math.round(255 * q[1]) + ',' + Math.round(255 * q[2]) + ')'),
                this._hasMaskedPath)
              ) {
                if ((_.translate(0, -t.ls), _.translate(0, (E[1] * R) / 100 + i, 0), S.p.p)) {
                  b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                  var pt = (180 * Math.atan(b)) / Math.PI;
                  h.point[0] < c.point[0] && (pt += 180), _.rotate((-pt * Math.PI) / 180);
                }
                _.translate(z, N, 0), (o -= (E[0] * T[s].an) / 200), T[s + 1] && J !== T[s + 1].ind && ((o += T[s].an / 2), (o += (t.tr / 1e3) * t.finalSize));
              } else {
                switch ((_.translate(r, i, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j)) {
                  case 1:
                    _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                    break;
                  case 2:
                    _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0);
                }
                _.translate(0, -t.ls), _.translate(G, 0, 0), _.translate((E[0] * T[s].an) / 200, (E[1] * R) / 100, 0), (r += T[s].l + (t.tr / 1e3) * t.finalSize);
              }
              'html' === C
                ? (rt = _.toCSS())
                : 'svg' === C
                ? (rt = _.to2dCSS())
                : (it = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]]),
                ($ = O);
            }
            A <= s ? ((V = new LetterProps($, Y, X, K, rt, it)), this.renderedLetters.push(V), (A += 1), (this.lettersChangedFlag = !0)) : ((V = this.renderedLetters[s]), (this.lettersChangedFlag = V.update($, Y, X, K, rt, it) || this.lettersChangedFlag));
          }
        }
      }),
      (TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId && ((this._frameId = this._elem.globalData.frameId), this.iterateDynamicProperties());
      }),
      (TextAnimatorProperty.prototype.mHelper = new Matrix()),
      (TextAnimatorProperty.prototype.defaultPropsArray = []),
      extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
      (LetterProps.prototype.update = function (t, e, r, i, s, a) {
        (this._mdf.o = !1), (this._mdf.sw = !1), (this._mdf.sc = !1), (this._mdf.fc = !1), (this._mdf.m = !1), (this._mdf.p = !1);
        var n = !1;
        return (
          this.o !== t && ((this.o = t), (this._mdf.o = !0), (n = !0)),
          this.sw !== e && ((this.sw = e), (this._mdf.sw = !0), (n = !0)),
          this.sc !== r && ((this.sc = r), (this._mdf.sc = !0), (n = !0)),
          this.fc !== i && ((this.fc = i), (this._mdf.fc = !0), (n = !0)),
          this.m !== s && ((this.m = s), (this._mdf.m = !0), (n = !0)),
          !a.length || (this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13]) || ((this.p = a), (this._mdf.p = !0), (n = !0)),
          n
        );
      }),
      (TextProperty.prototype.defaultBoxWidth = [0, 0]),
      (TextProperty.prototype.copyData = function (t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t;
      }),
      (TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t), (this.currentData = t), (this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth), (this._mdf = !0);
      }),
      (TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }),
      (TextProperty.prototype.searchKeyframes = function () {
        return (this.kf = this.data.d.k.length > 1), this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }),
      (TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) || t) {
          var e = this.currentData,
            r = this.keysIndex;
          if (this.lock) return void this.setCurrentData(this.currentData, currentTextValue);
          (this.lock = !0), (this._mdf = !1);
          var i,
            s = this.effectsSequence.length,
            a = t || this.data.d.k[this.keysIndex].s;
          for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
          e !== a && this.setCurrentData(a), (this.pv = this.v = this.currentData), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
        }
      }),
      (TextProperty.prototype.getKeyframeValue = function () {
        for (var t, e = this.data.d.k, r = this.elem.comp.renderedFrame, i = 0, s = e.length; i <= s - 1 && ((t = e[i].s), !(i === s - 1 || e[i + 1].t > r)); ) i += 1;
        return this.keysIndex !== i && (this.keysIndex = i), this.data.d.k[this.keysIndex].s;
      }),
      (TextProperty.prototype.buildFinalText = function (t) {
        for (var e = FontManager.getCombinedCharacterCodes(), r = [], i = 0, s = t.length; i < s; ) e.indexOf(t.charCodeAt(i)) !== -1 ? (r[r.length - 1] += t.charAt(i)) : r.push(t.charAt(i)), (i += 1);
        return r;
      }),
      (TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e,
          r,
          i,
          s,
          a,
          n,
          o,
          h = this.elem.globalData.fontManager,
          l = this.data,
          p = [],
          f = 0,
          m = l.m.g,
          c = 0,
          d = 0,
          u = 0,
          y = [],
          g = 0,
          v = 0,
          b = h.getFontByName(t.f),
          x = 0,
          E = b.fStyle ? b.fStyle.split(' ') : [],
          P = 'normal',
          S = 'normal';
        r = E.length;
        var _;
        for (e = 0; e < r; e += 1)
          switch ((_ = E[e].toLowerCase())) {
            case 'italic':
              S = 'italic';
              break;
            case 'bold':
              P = '700';
              break;
            case 'black':
              P = '900';
              break;
            case 'medium':
              P = '500';
              break;
            case 'regular':
            case 'normal':
              P = '400';
              break;
            case 'light':
            case 'thin':
              P = '200';
          }
        (t.fWeight = b.fWeight || P), (t.fStyle = S), (r = t.t.length), (t.finalSize = t.s), (t.finalText = this.buildFinalText(t.t)), (t.finalLineHeight = t.lh);
        var C,
          A = (t.tr / 1e3) * t.finalSize;
        if (t.sz)
          for (var T, k, M = !0, D = t.sz[0], w = t.sz[1]; M; ) {
            (k = this.buildFinalText(t.t)), (T = 0), (g = 0), (r = k.length), (A = (t.tr / 1e3) * t.finalSize);
            var F = -1;
            for (e = 0; e < r; e += 1)
              (C = k[e].charCodeAt(0)),
                (i = !1),
                ' ' === k[e] ? (F = e) : (13 !== C && 3 !== C) || ((g = 0), (i = !0), (T += t.finalLineHeight || 1.2 * t.finalSize)),
                h.chars ? ((o = h.getCharData(k[e], b.fStyle, b.fFamily)), (x = i ? 0 : (o.w * t.finalSize) / 100)) : (x = h.measureText(k[e], t.f, t.finalSize)),
                g + x > D && ' ' !== k[e] ? (F === -1 ? (r += 1) : (e = F), (T += t.finalLineHeight || 1.2 * t.finalSize), k.splice(e, F === e ? 1 : 0, '\r'), (F = -1), (g = 0)) : ((g += x), (g += A));
            (T += (b.ascent * t.finalSize) / 100), this.canResize && t.finalSize > this.minimumFontSize && w < T ? ((t.finalSize -= 1), (t.finalLineHeight = (t.finalSize * t.lh) / t.s)) : ((t.finalText = k), (r = t.finalText.length), (M = !1));
          }
        (g = -A), (x = 0);
        var I,
          V = 0;
        for (e = 0; e < r; e += 1)
          if (
            ((i = !1),
            (I = t.finalText[e]),
            (C = I.charCodeAt(0)),
            ' ' === I ? (s = '\xa0') : 13 === C || 3 === C ? ((V = 0), y.push(g), (v = g > v ? g : v), (g = -2 * A), (s = ''), (i = !0), (u += 1)) : (s = t.finalText[e]),
            h.chars ? ((o = h.getCharData(I, b.fStyle, h.getFontByName(t.f).fFamily)), (x = i ? 0 : (o.w * t.finalSize) / 100)) : (x = h.measureText(s, t.f, t.finalSize)),
            ' ' === I ? (V += x + A) : ((g += x + A + V), (V = 0)),
            p.push({ l: x, an: x, add: c, n: i, anIndexes: [], val: s, line: u, animatorJustifyOffset: 0 }),
            2 == m)
          ) {
            if (((c += x), '' === s || '\xa0' === s || e === r - 1)) {
              for (('' !== s && '\xa0' !== s) || (c -= x); d <= e; ) (p[d].an = c), (p[d].ind = f), (p[d].extra = x), (d += 1);
              (f += 1), (c = 0);
            }
          } else if (3 == m) {
            if (((c += x), '' === s || e === r - 1)) {
              for ('' === s && (c -= x); d <= e; ) (p[d].an = c), (p[d].ind = f), (p[d].extra = x), (d += 1);
              (c = 0), (f += 1);
            }
          } else (p[f].ind = f), (p[f].extra = 0), (f += 1);
        if (((t.l = p), (v = g > v ? g : v), y.push(g), t.sz)) (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
        else
          switch (((t.boxWidth = v), t.j)) {
            case 1:
              t.justifyOffset = -t.boxWidth;
              break;
            case 2:
              t.justifyOffset = -t.boxWidth / 2;
              break;
            default:
              t.justifyOffset = 0;
          }
        t.lineWidths = y;
        var R,
          B,
          L = l.a;
        n = L.length;
        var G,
          z,
          N = [];
        for (a = 0; a < n; a += 1) {
          for (R = L[a], R.a.sc && (t.strokeColorAnim = !0), R.a.sw && (t.strokeWidthAnim = !0), (R.a.fc || R.a.fh || R.a.fs || R.a.fb) && (t.fillColorAnim = !0), z = 0, G = R.s.b, e = 0; e < r; e += 1)
            (B = p[e]), (B.anIndexes[a] = z), ((1 == G && '' !== B.val) || (2 == G && '' !== B.val && '\xa0' !== B.val) || (3 == G && (B.n || '\xa0' == B.val || e == r - 1)) || (4 == G && (B.n || e == r - 1))) && (1 === R.s.rn && N.push(z), (z += 1));
          l.a[a].s.totalChars = z;
          var O,
            H = -1;
          if (1 === R.s.rn) for (e = 0; e < r; e += 1) (B = p[e]), H != B.anIndexes[a] && ((H = B.anIndexes[a]), (O = N.splice(Math.floor(Math.random() * N.length), 1)[0])), (B.anIndexes[a] = O);
        }
        (t.yOffset = t.finalLineHeight || 1.2 * t.finalSize), (t.ls = t.ls || 0), (t.ascent = (b.ascent * t.finalSize) / 100);
      }),
      (TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        (r = this.copyData(r, t)), (this.data.d.k[e].s = r), this.recalculate(e), this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        (e.__complete = !1), (this.keysIndex = 0), (this._isFirstFrame = !0), this.getValue(e);
      }),
      (TextProperty.prototype.canResizeFont = function (t) {
        (this.canResize = t), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.setMinimumFontSize = function (t) {
        (this.minimumFontSize = Math.floor(t) || 1), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      });
    var TextSelectorProp = (function () {
        function t(t, e) {
          (this._currentTextLength = -1),
            (this.k = !1),
            (this.data = e),
            (this.elem = t),
            (this.comp = t.comp),
            (this.finalS = 0),
            (this.finalE = 0),
            this.initDynamicPropertyContainer(t),
            (this.s = PropertyFactory.getProp(t, e.s || { k: 0 }, 0, 0, this)),
            'e' in e ? (this.e = PropertyFactory.getProp(t, e.e, 0, 0, this)) : (this.e = { v: 100 }),
            (this.o = PropertyFactory.getProp(t, e.o || { k: 0 }, 0, 0, this)),
            (this.xe = PropertyFactory.getProp(t, e.xe || { k: 0 }, 0, 0, this)),
            (this.ne = PropertyFactory.getProp(t, e.ne || { k: 0 }, 0, 0, this)),
            (this.a = PropertyFactory.getProp(t, e.a, 0, 0.01, this)),
            this.dynamicProperties.length || this.getValue();
        }
        function e(e, r, i) {
          return new t(e, r, i);
        }
        var r = Math.max,
          i = Math.min,
          s = Math.floor;
        return (
          (t.prototype = {
            getMult: function (t) {
              this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
              var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                a = 0,
                n = this.finalS,
                o = this.finalE,
                h = this.data.sh;
              if (2 == h) (a = o === n ? (t >= o ? 1 : 0) : r(0, i(0.5 / (o - n) + (t - n) / (o - n), 1))), (a = e(a));
              else if (3 == h) (a = o === n ? (t >= o ? 0 : 1) : 1 - r(0, i(0.5 / (o - n) + (t - n) / (o - n), 1))), (a = e(a));
              else if (4 == h) o === n ? (a = 0) : ((a = r(0, i(0.5 / (o - n) + (t - n) / (o - n), 1))), a < 0.5 ? (a *= 2) : (a = 1 - 2 * (a - 0.5))), (a = e(a));
              else if (5 == h) {
                if (o === n) a = 0;
                else {
                  var l = o - n;
                  t = i(r(0, t + 0.5 - n), o - n);
                  var p = -l / 2 + t,
                    f = l / 2;
                  a = Math.sqrt(1 - (p * p) / (f * f));
                }
                a = e(a);
              } else 6 == h ? (o === n ? (a = 0) : ((t = i(r(0, t + 0.5 - n), o - n)), (a = (1 + Math.cos(Math.PI + (2 * Math.PI * t) / (o - n))) / 2)), (a = e(a))) : (t >= s(n) && (a = t - n < 0 ? 1 - (n - t) : r(0, i(o - t, 1))), (a = e(a)));
              return a * this.a.v;
            },
            getValue: function (t) {
              this.iterateDynamicProperties(), (this._mdf = t || this._mdf), (this._currentTextLength = this.elem.textProperty.currentData.l.length || 0), t && 2 === this.data.r && (this.e.v = this._currentTextLength);
              var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                r = this.o.v / e,
                i = this.s.v / e + r,
                s = this.e.v / e + r;
              if (i > s) {
                var a = i;
                (i = s), (s = a);
              }
              (this.finalS = i), (this.finalE = s);
            },
          }),
          extendPrototype([DynamicPropertyContainer], t),
          { getTextSelectorProp: e }
        );
      })(),
      pool_factory = (function () {
        return function (t, e, r, i) {
          function s() {
            var t;
            return n ? ((n -= 1), (t = h[n])) : (t = e()), t;
          }
          function a(t) {
            n === o && ((h = pooling['double'](h)), (o = 2 * o)), r && r(t), (h[n] = t), (n += 1);
          }
          var n = 0,
            o = t,
            h = createSizedArray(o),
            l = { newElement: s, release: a };
          return l;
        };
      })(),
      pooling = (function () {
        function t(t) {
          return t.concat(createSizedArray(t.length));
        }
        return { double: t };
      })(),
      point_pool = (function () {
        function t() {
          return createTypedArray('float32', 2);
        }
        return pool_factory(8, t);
      })(),
      shape_pool = (function () {
        function t() {
          return new ShapePath();
        }
        function e(t) {
          var e,
            r = t._length;
          for (e = 0; e < r; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), (t.v[e] = null), (t.i[e] = null), (t.o[e] = null);
          (t._length = 0), (t.c = !1);
        }
        function r(t) {
          var e,
            r = i.newElement(),
            s = void 0 === t._length ? t.v.length : t._length;
          r.setLength(s), (r.c = t.c);
          for (e = 0; e < s; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
          return r;
        }
        var i = pool_factory(4, t, e);
        return (i.clone = r), i;
      })(),
      shapeCollection_pool = (function () {
        function t() {
          var t;
          return i ? ((i -= 1), (t = a[i])) : (t = new ShapeCollection()), t;
        }
        function e(t) {
          var e,
            r = t._length;
          for (e = 0; e < r; e += 1) shape_pool.release(t.shapes[e]);
          (t._length = 0), i === s && ((a = pooling['double'](a)), (s = 2 * s)), (a[i] = t), (i += 1);
        }
        var r = { newShapeCollection: t, release: e },
          i = 0,
          s = 4,
          a = createSizedArray(s);
        return r;
      })(),
      segments_length_pool = (function () {
        function t() {
          return { lengths: [], totalLength: 0 };
        }
        function e(t) {
          var e,
            r = t.lengths.length;
          for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);
          t.lengths.length = 0;
        }
        return pool_factory(8, t, e);
      })(),
      bezier_length_pool = (function () {
        function t() {
          return { addedLength: 0, percents: createTypedArray('float32', defaultCurveSegments), lengths: createTypedArray('float32', defaultCurveSegments) };
        }
        return pool_factory(8, t);
      })();
    (BaseRenderer.prototype.checkLayers = function (t) {
      var e,
        r,
        i = this.layers.length;
      for (this.completeLayers = !0, e = i - 1; e >= 0; e--)
        this.elements[e] || ((r = this.layers[e]), r.ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e)), (this.completeLayers = !!this.elements[e] && this.completeLayers);
      this.checkPendingElements();
    }),
      (BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);
          case 0:
            return this.createComp(t);
          case 1:
            return this.createSolid(t);
          case 3:
            return this.createNull(t);
          case 4:
            return this.createShape(t);
          case 5:
            return this.createText(t);
          case 13:
            return this.createCamera(t);
        }
        return this.createNull(t);
      }),
      (BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }),
      (BaseRenderer.prototype.buildAllItems = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1) this.buildItem(t);
        this.checkPendingElements();
      }),
      (BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
          r,
          i = t.length,
          s = this.layers.length;
        for (e = 0; e < i; e += 1)
          for (r = 0; r < s; ) {
            if (this.layers[r].id == t[e].id) {
              this.layers[r] = t[e];
              break;
            }
            r += 1;
          }
      }),
      (BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }),
      (BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }),
      (BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
        for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n; )
          s[a].ind == e && (i[a] && i[a] !== !0 ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), (a += 1);
      }),
      (BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }),
      (BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1)
          if (t[e].xt) {
            var i = this.createComp(t[e]);
            i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
          }
      }),
      (BaseRenderer.prototype.setupGlobalData = function (t, e) {
        (this.globalData.fontManager = new FontManager()),
          this.globalData.fontManager.addChars(t.chars),
          this.globalData.fontManager.addFonts(t.fonts, e),
          (this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem)),
          (this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem)),
          (this.globalData.imageLoader = this.animationItem.imagePreloader),
          (this.globalData.frameId = 0),
          (this.globalData.frameRate = t.fr),
          (this.globalData.nm = t.nm),
          (this.globalData.compSize = { w: t.w, h: t.h });
      }),
      extendPrototype([BaseRenderer], SVGRenderer),
      (SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
          this.renderConfig.viewBoxSize ? this.svgElement.setAttribute('viewBox', this.renderConfig.viewBoxSize) : this.svgElement.setAttribute('viewBox', '0 0 ' + t.w + ' ' + t.h),
          this.renderConfig.viewBoxOnly ||
            (this.svgElement.setAttribute('width', t.w), this.svgElement.setAttribute('height', t.h), (this.svgElement.style.width = '100%'), (this.svgElement.style.height = '100%'), (this.svgElement.style.transform = 'translate3d(0,0,0)')),
          this.renderConfig.className && this.svgElement.setAttribute('class', this.renderConfig.className),
          this.svgElement.setAttribute('preserveAspectRatio', this.renderConfig.preserveAspectRatio),
          this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad), (this.data = t);
        var r = createNS('clipPath'),
          i = createNS('rect');
        i.setAttribute('width', t.w), i.setAttribute('height', t.h), i.setAttribute('x', 0), i.setAttribute('y', 0);
        var s = 'animationMask_' + randomString(10);
        r.setAttribute('id', s), r.appendChild(i), this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + s + ')'), e.appendChild(r), (this.layers = t.layers), (this.elements = createSizedArray(t.layers.length));
      }),
      (SVGRenderer.prototype.destroy = function () {
        (this.animationItem.wrapper.innerHTML = ''), (this.layerElement = null), (this.globalData.defs = null);
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
        (this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null);
      }),
      (SVGRenderer.prototype.updateContainerSize = function () {}),
      (SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var r = this.createItem(this.layers[t]);
          (e[t] = r),
            expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()),
            this.appendElementInPos(r, t),
            this.layers[t].tt && (this.elements[t - 1] && this.elements[t - 1] !== !0 ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)));
        }
      }),
      (SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          if ((t.checkParenting(), t.data.tt))
            for (var e = 0, r = this.elements.length; e < r; ) {
              if (this.elements[e] === t) {
                t.setMatte(this.elements[e - 1].layerId);
                break;
              }
              e += 1;
            }
        }
      }),
      (SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? (t = this.renderedFrame) : (this.renderedFrame = t), (this.globalData.frameNum = t), (this.globalData.frameId += 1), (this.globalData.projectInterface.currentFrame = t), (this.globalData._mdf = !1);
          var e,
            r = this.layers.length;
          for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e--) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
          if (this.globalData._mdf) for (e = 0; e < r; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        }
      }),
      (SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();
        if (r) {
          for (var i, s = 0; s < e; ) this.elements[s] && this.elements[s] !== !0 && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), (s += 1);
          i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r);
        }
      }),
      (SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = 'none';
      }),
      (SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = 'block';
      }),
      (MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }),
      (MaskElement.prototype.renderFrame = function (t) {
        var e,
          r = this.element.finalTransform.mat,
          i = this.masksProperties.length;
        for (e = 0; e < i; e++)
          if (
            ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
            (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute('fill-opacity', this.viewData[e].op.v),
            'n' !== this.masksProperties[e].mode &&
              (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute('x', -r.props[12]), this.viewData[e].invRect.setAttribute('y', -r.props[13])),
              this.storedData[e].x && (this.storedData[e].x._mdf || t)))
          ) {
            var s = this.storedData[e].expan;
            this.storedData[e].x.v < 0
              ? ('erode' !== this.storedData[e].lastOperator && ((this.storedData[e].lastOperator = 'erode'), this.storedData[e].elem.setAttribute('filter', 'url(' + locationHref + '#' + this.storedData[e].filterId + ')')),
                s.setAttribute('radius', -this.storedData[e].x.v))
              : ('dilate' !== this.storedData[e].lastOperator && ((this.storedData[e].lastOperator = 'dilate'), this.storedData[e].elem.setAttribute('filter', null)), this.storedData[e].elem.setAttribute('stroke-width', 2 * this.storedData[e].x.v));
          }
      }),
      (MaskElement.prototype.getMaskelement = function () {
        return this.maskElement;
      }),
      (MaskElement.prototype.createLayerSolidPath = function () {
        var t = 'M0,0 ';
        return (t += ' h' + this.globalData.compSize.w), (t += ' v' + this.globalData.compSize.h), (t += ' h-' + this.globalData.compSize.w), (t += ' v-' + this.globalData.compSize.h + ' ');
      }),
      (MaskElement.prototype.drawPath = function (t, e, r) {
        var i,
          s,
          a = ' M' + e.v[0][0] + ',' + e.v[0][1];
        for (s = e._length, i = 1; i < s; i += 1) a += ' C' + e.o[i - 1][0] + ',' + e.o[i - 1][1] + ' ' + e.i[i][0] + ',' + e.i[i][1] + ' ' + e.v[i][0] + ',' + e.v[i][1];
        if ((e.c && s > 1 && (a += ' C' + e.o[i - 1][0] + ',' + e.o[i - 1][1] + ' ' + e.i[0][0] + ',' + e.i[0][1] + ' ' + e.v[0][0] + ',' + e.v[0][1]), r.lastPath !== a)) {
          var n = '';
          r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute('d', n)), (r.lastPath = a);
        }
      }),
      (MaskElement.prototype.destroy = function () {
        (this.element = null), (this.globalData = null), (this.maskElement = null), (this.data = null), (this.masksProperties = null);
      }),
      (HierarchyElement.prototype = {
        initHierarchy: function () {
          (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
        },
        setHierarchy: function (t) {
          this.hierarchy = t;
        },
        setAsParent: function () {
          this._isParent = !0;
        },
        checkParenting: function () {
          void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
        },
      }),
      (FrameElement.prototype = {
        initFrame: function () {
          (this._isFirstFrame = !1), (this.dynamicProperties = []), (this._mdf = !1);
        },
        prepareProperties: function (t, e) {
          var r,
            i = this.dynamicProperties.length;
          for (r = 0; r < i; r += 1) (e || (this._isParent && 'transform' === this.dynamicProperties[r].propType)) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && ((this.globalData._mdf = !0), (this._mdf = !0)));
        },
        addDynamicProperty: function (t) {
          this.dynamicProperties.indexOf(t) === -1 && this.dynamicProperties.push(t);
        },
      }),
      (TransformElement.prototype = {
        initTransform: function () {
          (this.finalTransform = { mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 }, _matMdf: !1, _opMdf: !1, mat: new Matrix() }),
            this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
            11 !== this.data.ty;
        },
        renderTransform: function () {
          if (((this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame), (this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame), this.hierarchy)) {
            var t,
              e = this.finalTransform.mat,
              r = 0,
              i = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; r < i; ) {
                if (this.hierarchy[r].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = !0;
                  break;
                }
                r += 1;
              }
            if (this.finalTransform._matMdf)
              for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1)
                (t = this.hierarchy[r].finalTransform.mProp.v.props), e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
          }
        },
        globalToLocal: function (t) {
          var e = [];
          e.push(this.finalTransform);
          for (var r = !0, i = this.comp; r; ) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), (i = i.comp)) : (r = !1);
          var s,
            a,
            n = e.length;
          for (s = 0; s < n; s += 1) (a = e[s].mat.applyToPointArray(0, 0, 0)), (t = [t[0] - a[0], t[1] - a[1], 0]);
          return t;
        },
        mHelper: new Matrix(),
      }),
      (RenderableElement.prototype = {
        initRenderable: function () {
          (this.isInRange = !1), (this.hidden = !1), (this.isTransparent = !1), (this.renderableComponents = []);
        },
        addRenderableComponent: function (t) {
          this.renderableComponents.indexOf(t) === -1 && this.renderableComponents.push(t);
        },
        removeRenderableComponent: function (t) {
          this.renderableComponents.indexOf(t) !== -1 && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
        },
        prepareRenderableFrame: function (t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function () {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && ((this.isTransparent = !0), this.hide()) : this.isTransparent && ((this.isTransparent = !1), this.show());
        },
        checkLayerLimits: function (t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
            ? this.isInRange !== !0 && ((this.globalData._mdf = !0), (this._mdf = !0), (this.isInRange = !0), this.show())
            : this.isInRange !== !1 && ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide());
        },
        renderRenderable: function () {
          var t,
            e = this.renderableComponents.length;
          for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame);
        },
        sourceRectAtTime: function () {
          return { top: 0, left: 0, width: 100, height: 100 };
        },
        getLayerSize: function () {
          return 5 === this.data.ty ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
        },
      }),
      (function () {
        var t = {
          initElement: function (t, e, r) {
            this.initFrame(),
              this.initBaseData(t, e, r),
              this.initTransform(t, e, r),
              this.initHierarchy(),
              this.initRenderable(),
              this.initRendererElement(),
              this.createContainerElements(),
              this.createRenderableComponents(),
              this.createContent(),
              this.hide();
          },
          hide: function () {
            if (!this.hidden && (!this.isInRange || this.isTransparent)) {
              var t = this.baseElement || this.layerElement;
              (t.style.display = 'none'), (this.hidden = !0);
            }
          },
          show: function () {
            if (this.isInRange && !this.isTransparent) {
              if (!this.data.hd) {
                var t = this.baseElement || this.layerElement;
                t.style.display = 'block';
              }
              (this.hidden = !1), (this._isFirstFrame = !0);
            }
          },
          renderFrame: function () {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
          },
          renderInnerContent: function () {},
          prepareFrame: function (t) {
            (this._mdf = !1), this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
          },
          destroy: function () {
            (this.innerElem = null), this.destroyBaseElement();
          },
        };
        extendPrototype([RenderableElement, createProxyFunction(t)], RenderableDOMElement);
      })(),
      (SVGStyleData.prototype.reset = function () {
        (this.d = ''), (this._mdf = !1);
      }),
      (SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }),
      extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
      extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
      (SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
          (this.s = PropertyFactory.getProp(t, e.s, 1, null, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 1, null, this)),
          (this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, 0.01, this)),
          (this.a = PropertyFactory.getProp(t, e.a || { k: 0 }, 0, degToRads, this)),
          (this.g = new GradientProperty(t, e.g, this)),
          (this.style = r),
          (this.stops = []),
          this.setGradientData(r.pElem, e),
          this.setGradientOpacity(e, r),
          (this._isAnimated = !!this._isAnimated);
      }),
      (SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var r = 'gr_' + randomString(10),
          i = createNS(1 === e.t ? 'linearGradient' : 'radialGradient');
        i.setAttribute('id', r), i.setAttribute('spreadMethod', 'pad'), i.setAttribute('gradientUnits', 'userSpaceOnUse');
        var s,
          a,
          n,
          o = [];
        for (n = 4 * e.g.p, a = 0; a < n; a += 4) (s = createNS('stop')), i.appendChild(s), o.push(s);
        t.setAttribute('gf' === e.ty ? 'fill' : 'stroke', 'url(' + locationHref + '#' + r + ')'), (this.gf = i), (this.cst = o);
      }),
      (SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r,
            i,
            s,
            a = createNS('mask'),
            n = createNS('path');
          a.appendChild(n);
          var o = 'op_' + randomString(10),
            h = 'mk_' + randomString(10);
          a.setAttribute('id', h);
          var l = createNS(1 === t.t ? 'linearGradient' : 'radialGradient');
          l.setAttribute('id', o), l.setAttribute('spreadMethod', 'pad'), l.setAttribute('gradientUnits', 'userSpaceOnUse'), (s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length);
          var p = this.stops;
          for (i = 4 * t.g.p; i < s; i += 2) (r = createNS('stop')), r.setAttribute('stop-color', 'rgb(255,255,255)'), l.appendChild(r), p.push(r);
          n.setAttribute('gf' === t.ty ? 'fill' : 'stroke', 'url(' + locationHref + '#' + o + ')'), (this.of = l), (this.ms = a), (this.ost = p), (this.maskId = h), (e.msElem = n);
        }
      }),
      extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
      extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
    var SVGElementsRenderer = (function () {
      function t(t) {
        t.ty;
        switch (t.ty) {
          case 'fl':
            return i;
          case 'gf':
            return a;
          case 'gs':
            return s;
          case 'st':
            return n;
          case 'sh':
          case 'el':
          case 'rc':
          case 'sr':
            return r;
          case 'tr':
            return e;
        }
      }
      function e(t, e, r) {
        (r || e.transform.op._mdf) && e.transform.container.setAttribute('opacity', e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute('transform', e.transform.mProps.v.to2dCSS());
      }
      function r(t, e, r) {
        var i,
          s,
          a,
          n,
          l,
          p,
          f,
          m,
          c,
          d,
          u,
          y = e.styles.length,
          g = e.lvl;
        for (p = 0; p < y; p += 1) {
          if (((n = e.sh._mdf || r), e.styles[p].lvl < g)) {
            for (m = h.reset(), d = g - e.styles[p].lvl, u = e.transformers.length - 1; !n && d > 0; ) (n = e.transformers[u].mProps._mdf || n), d--, u--;
            if (n) for (d = g - e.styles[p].lvl, u = e.transformers.length - 1; d > 0; ) (c = e.transformers[u].mProps.v.props), m.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), d--, u--;
          } else m = o;
          if (((f = e.sh.paths), (s = f._length), n)) {
            for (a = '', i = 0; i < s; i += 1) (l = f.shapes[i]), l && l._length && (a += buildShapeString(l, l._length, l.c, m));
            e.caches[p] = a;
          } else a = e.caches[p];
          (e.styles[p].d += t.hd === !0 ? '' : a), (e.styles[p]._mdf = n || e.styles[p]._mdf);
        }
      }
      function i(t, e, r) {
        var i = e.style;
        (e.c._mdf || r) && i.pElem.setAttribute('fill', 'rgb(' + bm_floor(e.c.v[0]) + ',' + bm_floor(e.c.v[1]) + ',' + bm_floor(e.c.v[2]) + ')'), (e.o._mdf || r) && i.pElem.setAttribute('fill-opacity', e.o.v);
      }
      function s(t, e, r) {
        a(t, e, r), n(t, e, r);
      }
      function a(t, e, r) {
        var i = e.gf,
          s = e.g._hasOpacity,
          a = e.s.v,
          n = e.e.v;
        if (e.o._mdf || r) {
          var o = 'gf' === t.ty ? 'fill-opacity' : 'stroke-opacity';
          e.style.pElem.setAttribute(o, e.o.v);
        }
        if (e.s._mdf || r) {
          var h = 1 === t.t ? 'x1' : 'cx',
            l = 'x1' === h ? 'y1' : 'cy';
          i.setAttribute(h, a[0]), i.setAttribute(l, a[1]), s && !e.g._collapsable && (e.of.setAttribute(h, a[0]), e.of.setAttribute(l, a[1]));
        }
        var p, f, m, c;
        if (e.g._cmdf || r) {
          p = e.cst;
          var d = e.g.c;
          for (m = p.length, f = 0; f < m; f += 1) (c = p[f]), c.setAttribute('offset', d[4 * f] + '%'), c.setAttribute('stop-color', 'rgb(' + d[4 * f + 1] + ',' + d[4 * f + 2] + ',' + d[4 * f + 3] + ')');
        }
        if (s && (e.g._omdf || r)) {
          var u = e.g.o;
          for (p = e.g._collapsable ? e.cst : e.ost, m = p.length, f = 0; f < m; f += 1) (c = p[f]), e.g._collapsable || c.setAttribute('offset', u[2 * f] + '%'), c.setAttribute('stop-opacity', u[2 * f + 1]);
        }
        if (1 === t.t) (e.e._mdf || r) && (i.setAttribute('x2', n[0]), i.setAttribute('y2', n[1]), s && !e.g._collapsable && (e.of.setAttribute('x2', n[0]), e.of.setAttribute('y2', n[1])));
        else {
          var y;
          if (((e.s._mdf || e.e._mdf || r) && ((y = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2))), i.setAttribute('r', y), s && !e.g._collapsable && e.of.setAttribute('r', y)), e.e._mdf || e.h._mdf || e.a._mdf || r)) {
            y || (y = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)));
            var g = Math.atan2(n[1] - a[1], n[0] - a[0]),
              v = e.h.v >= 1 ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v,
              b = y * v,
              x = Math.cos(g + e.a.v) * b + a[0],
              E = Math.sin(g + e.a.v) * b + a[1];
            i.setAttribute('fx', x), i.setAttribute('fy', E), s && !e.g._collapsable && (e.of.setAttribute('fx', x), e.of.setAttribute('fy', E));
          }
        }
      }
      function n(t, e, r) {
        var i = e.style,
          s = e.d;
        s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute('stroke-dasharray', s.dashStr), i.pElem.setAttribute('stroke-dashoffset', s.dashoffset[0])),
          e.c && (e.c._mdf || r) && i.pElem.setAttribute('stroke', 'rgb(' + bm_floor(e.c.v[0]) + ',' + bm_floor(e.c.v[1]) + ',' + bm_floor(e.c.v[2]) + ')'),
          (e.o._mdf || r) && i.pElem.setAttribute('stroke-opacity', e.o.v),
          (e.w._mdf || r) && (i.pElem.setAttribute('stroke-width', e.w.v), i.msElem && i.msElem.setAttribute('stroke-width', e.w.v));
      }
      var o = new Matrix(),
        h = new Matrix(),
        l = { createRenderFunction: t };
      return l;
    })();
    (ShapeTransformManager.prototype = {
      addTransformSequence: function (t) {
        var e,
          r = t.length,
          i = '_';
        for (e = 0; e < r; e += 1) i += t[e].transform.key + '_';
        var s = this.sequences[i];
        return s || ((s = { transforms: [].concat(t), finalTransform: new Matrix(), _mdf: !1 }), (this.sequences[i] = s), this.sequenceList.push(s)), s;
      },
      processSequence: function (t, e) {
        for (var r = 0, i = t.transforms.length, s = e; r < i && !e; ) {
          if (t.transforms[r].transform.mProps._mdf) {
            s = !0;
            break;
          }
          r += 1;
        }
        if (s) {
          var a;
          for (t.finalTransform.reset(), r = i - 1; r >= 0; r -= 1) (a = t.transforms[r].transform.mProps.v.props), t.finalTransform.transform(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
        }
        t._mdf = s;
      },
      processSequences: function (t) {
        var e,
          r = this.sequenceList.length;
        for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t);
      },
      getNewKey: function () {
        return '_' + this.transform_key_count++;
      },
    }),
      (BaseElement.prototype = {
        checkMasks: function () {
          if (!this.data.hasMask) return !1;
          for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
            if ('n' !== this.data.masksProperties[t].mode && this.data.masksProperties[t].cl !== !1) return !0;
            t += 1;
          }
          return !1;
        },
        initExpressions: function () {
          (this.layerInterface = LayerExpressionInterface(this)), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
          this.layerInterface.registerEffectsInterface(t),
            0 === this.data.ty || this.data.xt
              ? (this.compInterface = CompExpressionInterface(this))
              : 4 === this.data.ty
              ? ((this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface)), (this.layerInterface.content = this.layerInterface.shapeInterface))
              : 5 === this.data.ty && ((this.layerInterface.textInterface = TextExpressionInterface(this)), (this.layerInterface.text = this.layerInterface.textInterface));
        },
        blendModeEnums: { 1: 'multiply', 2: 'screen', 3: 'overlay', 4: 'darken', 5: 'lighten', 6: 'color-dodge', 7: 'color-burn', 8: 'hard-light', 9: 'soft-light', 10: 'difference', 11: 'exclusion', 12: 'hue', 13: 'saturation', 14: 'color', 15: 'luminosity' },
        getBlendMode: function () {
          return this.blendModeEnums[this.data.bm] || '';
        },
        setBlendMode: function () {
          var t = this.getBlendMode(),
            e = this.baseElement || this.layerElement;
          e.style['mix-blend-mode'] = t;
        },
        initBaseData: function (t, e, r) {
          (this.globalData = e), (this.comp = r), (this.data = t), (this.layerId = 'ly_' + randomString(10)), this.data.sr || (this.data.sr = 1), (this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties));
        },
        getType: function () {
          return this.type;
        },
      }),
      (NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }),
      (NullElement.prototype.renderFrame = function () {}),
      (NullElement.prototype.getBaseElement = function () {
        return null;
      }),
      (NullElement.prototype.destroy = function () {}),
      (NullElement.prototype.sourceRectAtTime = function () {}),
      (NullElement.prototype.hide = function () {}),
      extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
      (SVGBaseElement.prototype = {
        initRendererElement: function () {
          this.layerElement = createNS('g');
        },
        createContainerElements: function () {
          (this.matteElement = createNS('g')), (this.transformedElement = this.layerElement), (this.maskedElement = this.layerElement), (this._sizeChanged = !1);
          var t,
            e,
            r,
            i = null;
          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s = createNS('mask');
              s.setAttribute('id', this.layerId),
                s.setAttribute('mask-type', 3 == this.data.td ? 'luminance' : 'alpha'),
                s.appendChild(this.layerElement),
                (i = s),
                this.globalData.defs.appendChild(s),
                featureSupport.maskType ||
                  1 != this.data.td ||
                  (s.setAttribute('mask-type', 'luminance'),
                  (t = randomString(10)),
                  (e = filtersFactory.createFilter(t)),
                  this.globalData.defs.appendChild(e),
                  e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                  (r = createNS('g')),
                  r.appendChild(this.layerElement),
                  (i = r),
                  s.appendChild(r),
                  r.setAttribute('filter', 'url(' + locationHref + '#' + t + ')'));
            } else if (2 == this.data.td) {
              var a = createNS('mask');
              a.setAttribute('id', this.layerId), a.setAttribute('mask-type', 'alpha');
              var n = createNS('g');
              a.appendChild(n), (t = randomString(10)), (e = filtersFactory.createFilter(t));
              var o = createNS('feColorMatrix');
              o.setAttribute('type', 'matrix'), o.setAttribute('color-interpolation-filters', 'sRGB'), o.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1'), e.appendChild(o), this.globalData.defs.appendChild(e);
              var h = createNS('rect');
              h.setAttribute('width', this.comp.data.w),
                h.setAttribute('height', this.comp.data.h),
                h.setAttribute('x', '0'),
                h.setAttribute('y', '0'),
                h.setAttribute('fill', '#ffffff'),
                h.setAttribute('opacity', '0'),
                n.setAttribute('filter', 'url(' + locationHref + '#' + t + ')'),
                n.appendChild(h),
                n.appendChild(this.layerElement),
                (i = n),
                featureSupport.maskType || (a.setAttribute('mask-type', 'luminance'), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS('g')), n.appendChild(h), r.appendChild(this.layerElement), (i = r), n.appendChild(r)),
                this.globalData.defs.appendChild(a);
            }
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), (i = this.matteElement), (this.baseElement = this.matteElement)) : (this.baseElement = this.layerElement);
          if ((this.data.ln && this.layerElement.setAttribute('id', this.data.ln), this.data.cl && this.layerElement.setAttribute('class', this.data.cl), 0 === this.data.ty && !this.data.hd)) {
            var l = createNS('clipPath'),
              p = createNS('path');
            p.setAttribute('d', 'M0,0 L' + this.data.w + ',0 L' + this.data.w + ',' + this.data.h + ' L0,' + this.data.h + 'z');
            var f = 'cp_' + randomString(8);
            if ((l.setAttribute('id', f), l.appendChild(p), this.globalData.defs.appendChild(l), this.checkMasks())) {
              var m = createNS('g');
              m.setAttribute('clip-path', 'url(' + locationHref + '#' + f + ')'), m.appendChild(this.layerElement), (this.transformedElement = m), i ? i.appendChild(this.transformedElement) : (this.baseElement = this.transformedElement);
            } else this.layerElement.setAttribute('clip-path', 'url(' + locationHref + '#' + f + ')');
          }
          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf && this.transformedElement.setAttribute('transform', this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute('opacity', this.finalTransform.mProp.o.v);
        },
        destroyBaseElement: function () {
          (this.layerElement = null), (this.matteElement = null), this.maskManager.destroy();
        },
        getBaseElement: function () {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function () {
          (this.maskManager = new MaskElement(this.data, this, this.globalData)), (this.renderableEffectsManager = new SVGEffects(this));
        },
        setMatte: function (t) {
          this.matteElement && this.matteElement.setAttribute('mask', 'url(' + locationHref + '#' + t + ')');
        },
      }),
      (IShapeElement.prototype = {
        addShapeToModifiers: function (t) {
          var e,
            r = this.shapeModifiers.length;
          for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t);
        },
        isShapeInAnimatedModifiers: function (t) {
          for (var e = 0, r = this.shapeModifiers.length; e < r; ) if (this.shapeModifiers[e].isAnimatedWithShape(t)) return !0;
          return !1;
        },
        renderModifiers: function () {
          if (this.shapeModifiers.length) {
            var t,
              e = this.shapes.length;
            for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
            for (e = this.shapeModifiers.length, t = e - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame);
          }
        },
        lcEnum: { 1: 'butt', 2: 'round', 3: 'square' },
        ljEnum: { 1: 'miter', 2: 'round', 3: 'bevel' },
        searchProcessedElement: function (t) {
          for (var e = this.processedElements, r = 0, i = e.length; r < i; ) {
            if (e[r].elem === t) return e[r].pos;
            r += 1;
          }
          return 0;
        },
        addProcessedElement: function (t, e) {
          for (var r = this.processedElements, i = r.length; i; ) if (((i -= 1), r[i].elem === t)) return void (r[i].pos = e);
          r.push(new ProcessedElement(t, e));
        },
        prepareFrame: function (t) {
          this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
        },
      }),
      (ITextElement.prototype.initElement = function (t, e, r) {
        (this.lettersChangedFlag = !0),
          this.initFrame(),
          this.initBaseData(t, e, r),
          (this.textProperty = new TextProperty(this, t.t, this.dynamicProperties)),
          (this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this)),
          this.initTransform(t, e, r),
          this.initHierarchy(),
          this.initRenderable(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          this.createContent(),
          this.hide(),
          this.textAnimator.searchProperties(this.dynamicProperties);
      }),
      (ITextElement.prototype.prepareFrame = function (t) {
        (this._mdf = !1), this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), (this.textProperty._isFirstFrame = !1), (this.textProperty._mdf = !1));
      }),
      (ITextElement.prototype.createPathShape = function (t, e) {
        var r,
          i,
          s = e.length,
          a = '';
        for (r = 0; r < s; r += 1) (i = e[r].ks.k), (a += buildShapeString(i, i.i.length, !0, t));
        return a;
      }),
      (ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }),
      (ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }),
      (ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }),
      (ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
        switch ((t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j)) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
            break;
          case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
        }
        e.translate(i, s, 0);
      }),
      (ITextElement.prototype.buildColor = function (t) {
        return 'rgb(' + Math.round(255 * t[0]) + ',' + Math.round(255 * t[1]) + ',' + Math.round(255 * t[2]) + ')';
      }),
      (ITextElement.prototype.emptyProp = new LetterProps()),
      (ITextElement.prototype.destroy = function () {}),
      extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement),
      (ICompElement.prototype.initElement = function (t, e, r) {
        this.initFrame(),
          this.initBaseData(t, e, r),
          this.initTransform(t, e, r),
          this.initRenderable(),
          this.initHierarchy(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          (!this.data.xt && e.progressiveLoad) || this.buildAllItems(),
          this.hide();
      }),
      (ICompElement.prototype.prepareFrame = function (t) {
        if (((this._mdf = !1), this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt)) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
          else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1), (this.renderedFrame = e);
          }
          var r,
            i = this.elements.length;
          for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)
            (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
        }
      }),
      (ICompElement.prototype.renderInnerContent = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
      }),
      (ICompElement.prototype.setElements = function (t) {
        this.elements = t;
      }),
      (ICompElement.prototype.getElements = function () {
        return this.elements;
      }),
      (ICompElement.prototype.destroyElements = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
      }),
      (ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }),
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement),
      (IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        (this.innerElem = createNS('image')),
          this.innerElem.setAttribute('width', this.assetData.w + 'px'),
          this.innerElem.setAttribute('height', this.assetData.h + 'px'),
          this.innerElem.setAttribute('preserveAspectRatio', this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio),
          this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', t),
          this.layerElement.appendChild(this.innerElem);
      }),
      extendPrototype([IImageElement], ISolidElement),
      (ISolidElement.prototype.createContent = function () {
        var t = createNS('rect');
        t.setAttribute('width', this.data.sw), t.setAttribute('height', this.data.sh), t.setAttribute('fill', this.data.sc), this.layerElement.appendChild(t);
      }),
      extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement),
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement),
      (SVGTextElement.prototype.createContent = function () {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS('text'));
      }),
      (SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, r = t.length, i = [], s = ''; e < r; ) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), (s = '')) : (s += t[e]), (e += 1);
        return i.push(s), i;
      }),
      (SVGTextElement.prototype.buildNewText = function () {
        var t,
          e,
          r = this.textProperty.currentData;
        (this.renderedLetters = createSizedArray(r ? r.l.length : 0)),
          r.fc ? this.layerElement.setAttribute('fill', this.buildColor(r.fc)) : this.layerElement.setAttribute('fill', 'rgba(0,0,0,0)'),
          r.sc && (this.layerElement.setAttribute('stroke', this.buildColor(r.sc)), this.layerElement.setAttribute('stroke-width', r.sw)),
          this.layerElement.setAttribute('font-size', r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass) this.layerElement.setAttribute('class', i.fClass);
        else {
          this.layerElement.setAttribute('font-family', i.fFamily);
          var s = r.fWeight,
            a = r.fStyle;
          this.layerElement.setAttribute('font-style', a), this.layerElement.setAttribute('font-weight', s);
        }
        var n = r.l || [],
          o = !!this.globalData.fontManager.chars;
        e = n.length;
        var h,
          l,
          p = this.mHelper,
          f = '',
          m = this.data.singleShape,
          c = 0,
          d = 0,
          u = !0,
          y = (r.tr / 1e3) * r.finalSize;
        if (!m || o || r.sz) {
          var g,
            v,
            b = this.textSpans.length;
          for (t = 0; t < e; t += 1)
            (o && m && 0 !== t) ||
              ((h = b > t ? this.textSpans[t] : createNS(o ? 'path' : 'text')),
              b <= t && (h.setAttribute('stroke-linecap', 'butt'), h.setAttribute('stroke-linejoin', 'round'), h.setAttribute('stroke-miterlimit', '4'), (this.textSpans[t] = h), this.layerElement.appendChild(h)),
              (h.style.display = 'inherit')),
              p.reset(),
              p.scale(r.finalSize / 100, r.finalSize / 100),
              m && (n[t].n && ((c = -y), (d += r.yOffset), (d += u ? 1 : 0), (u = !1)), this.applyTextPropertiesToMatrix(r, p, n[t].line, c, d), (c += n[t].l || 0), (c += y)),
              o
                ? ((v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)),
                  (g = (v && v.data) || {}),
                  (l = g.shapes ? g.shapes[0].it : []),
                  m ? (f += this.createPathShape(p, l)) : h.setAttribute('d', this.createPathShape(p, l)))
                : (m && h.setAttribute('transform', 'translate(' + p.props[12] + ',' + p.props[13] + ')'), (h.textContent = n[t].val), h.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve'));
          m && h && h.setAttribute('d', f);
        } else {
          var x = this.textContainer,
            E = 'start';
          switch (r.j) {
            case 1:
              E = 'end';
              break;
            case 2:
              E = 'middle';
          }
          x.setAttribute('text-anchor', E), x.setAttribute('letter-spacing', y);
          var P = this.buildTextContents(r.finalText);
          for (e = P.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)
            (h = this.textSpans[t] || createNS('tspan')), (h.textContent = P[t]), h.setAttribute('x', 0), h.setAttribute('y', d), (h.style.display = 'inherit'), x.appendChild(h), (this.textSpans[t] = h), (d += r.finalLineHeight);
          this.layerElement.appendChild(x);
        }
        for (; t < this.textSpans.length; ) (this.textSpans[t].style.display = 'none'), (t += 1);
        this._sizeChanged = !0;
      }),
      (SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if ((this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged)) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height };
        }
        return this.bbox;
      }),
      (SVGTextElement.prototype.renderInnerContent = function () {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          this._sizeChanged = !0;
          var t,
            e,
            r = this.textAnimator.renderedLetters,
            i = this.textProperty.currentData.l;
          e = i.length;
          var s, a;
          for (t = 0; t < e; t += 1)
            i[t].n ||
              ((s = r[t]),
              (a = this.textSpans[t]),
              s._mdf.m && a.setAttribute('transform', s.m),
              s._mdf.o && a.setAttribute('opacity', s.o),
              s._mdf.sw && a.setAttribute('stroke-width', s.sw),
              s._mdf.sc && a.setAttribute('stroke', s.sc),
              s._mdf.fc && a.setAttribute('fill', s.fc));
        }
      }),
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement),
      (SVGShapeElement.prototype.initSecondaryElement = function () {}),
      (SVGShapeElement.prototype.identityMatrix = new Matrix()),
      (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
      (SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }),
      (SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t,
          e,
          r,
          i,
          s = this.shapes.length,
          a = this.stylesList.length,
          n = [],
          o = !1;
        for (r = 0; r < a; r += 1) {
          for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < s; t += 1) (e = this.shapes[t]), e.styles.indexOf(i) !== -1 && (n.push(e), (o = e._isAnimated || o));
          n.length > 1 && o && this.setShapesAsAnimated(n);
        }
      }),
      (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) t[e].setAsAnimated();
      }),
      (SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var r,
          i = new SVGStyleData(t, e),
          s = i.pElem;
        if ('st' === t.ty) r = new SVGStrokeStyleData(this, t, i);
        else if ('fl' === t.ty) r = new SVGFillStyleData(this, t, i);
        else if ('gf' === t.ty || 'gs' === t.ty) {
          var a = 'gf' === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
          (r = new a(this, t, i)), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute('mask', 'url(' + locationHref + '#' + r.maskId + ')'));
        }
        return (
          ('st' !== t.ty && 'gs' !== t.ty) ||
            (s.setAttribute('stroke-linecap', this.lcEnum[t.lc] || 'round'), s.setAttribute('stroke-linejoin', this.ljEnum[t.lj] || 'round'), s.setAttribute('fill-opacity', '0'), 1 === t.lj && s.setAttribute('stroke-miterlimit', t.ml)),
          2 === t.r && s.setAttribute('fill-rule', 'evenodd'),
          t.ln && s.setAttribute('id', t.ln),
          t.cl && s.setAttribute('class', t.cl),
          this.stylesList.push(i),
          this.addToAnimatedContents(t, r),
          r
        );
      }),
      (SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData();
        return t.ln && e.gr.setAttribute('id', t.ln), t.cl && e.gr.setAttribute('class', t.cl), e;
      }),
      (SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this),
          i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i;
      }),
      (SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
        var i = 4;
        'rc' === t.ty ? (i = 5) : 'el' === t.ty ? (i = 6) : 'sr' === t.ty && (i = 7);
        var s = ShapePropertyFactory.getShapeProp(this, t, i, this),
          a = new SVGShapeData(e, r, s);
        return this.shapes.push(a), this.addShapeToModifiers(a), this.addToAnimatedContents(t, a), a;
      }),
      (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i; ) {
          if (this.animatedContents[r].element === e) return;
          r += 1;
        }
        this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(t), element: e, data: t });
      }),
      (SVGShapeElement.prototype.setElementStyles = function (t) {
        var e,
          r = t.styles,
          i = this.stylesList.length;
        for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e]);
      }),
      (SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
          e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
        this.renderModifiers();
      }),
      (SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
        var o,
          h,
          l,
          p,
          f,
          m,
          c = [].concat(a),
          d = t.length - 1,
          u = [],
          y = [];
        for (o = d; o >= 0; o -= 1) {
          if (((m = this.searchProcessedElement(t[o])), m ? (e[o] = r[m - 1]) : (t[o]._render = n), 'fl' == t[o].ty || 'st' == t[o].ty || 'gf' == t[o].ty || 'gs' == t[o].ty))
            m ? (e[o].style.closed = !1) : (e[o] = this.createStyleElement(t[o], s)), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);
          else if ('gr' == t[o].ty) {
            if (m) for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
            else e[o] = this.createGroupElement(t[o]);
            this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr);
          } else
            'tr' == t[o].ty
              ? (m || (e[o] = this.createTransformElement(t[o], i)), (p = e[o].transform), c.push(p))
              : 'sh' == t[o].ty || 'rc' == t[o].ty || 'el' == t[o].ty || 'sr' == t[o].ty
              ? (m || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o]))
              : 'tm' == t[o].ty || 'rd' == t[o].ty || 'ms' == t[o].ty
              ? (m ? ((f = e[o]), (f.closed = !1)) : ((f = ShapeModifiers.getModifier(t[o].ty)), f.init(this, t[o]), (e[o] = f), this.shapeModifiers.push(f)), y.push(f))
              : 'rp' == t[o].ty && (m ? ((f = e[o]), (f.closed = !0)) : ((f = ShapeModifiers.getModifier(t[o].ty)), (e[o] = f), f.init(this, t, o, e), this.shapeModifiers.push(f), (n = !1)), y.push(f));
          this.addProcessedElement(t[o], o + 1);
        }
        for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
        for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0;
      }),
      (SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
          e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].reset();
        for (this.renderShape(), t = 0; t < e; t += 1)
          (this.stylesList[t]._mdf || this._isFirstFrame) &&
            (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute('d', this.stylesList[t].d), (this.stylesList[t].d = 'M0 0' + this.stylesList[t].d)), this.stylesList[t].pElem.setAttribute('d', this.stylesList[t].d || 'M0 0'));
      }),
      (SVGShapeElement.prototype.renderShape = function () {
        var t,
          e,
          r = this.animatedContents.length;
        for (t = 0; t < r; t += 1) (e = this.animatedContents[t]), (this._isFirstFrame || e.element._isAnimated) && e.data !== !0 && e.fn(e.data, e.element, this._isFirstFrame);
      }),
      (SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(), (this.shapesData = null), (this.itemsData = null);
      }),
      (SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            i = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute('values', r[0] - e[0] + ' 0 0 0 ' + e[0] + ' ' + (r[1] - e[1]) + ' 0 0 0 ' + e[1] + ' ' + (r[2] - e[2]) + ' 0 0 0 ' + e[2] + ' 0 0 0 ' + i + ' 0');
        }
      }),
      (SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
            r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute('values', '0 0 0 0 ' + e[0] + ' 0 0 0 0 ' + e[1] + ' 0 0 0 0 ' + e[2] + ' 0 0 0 ' + r + ' 0');
        }
      }),
      (SVGStrokeEffect.prototype.initialize = function () {
        var t,
          e,
          r,
          i,
          s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
        for (
          1 === this.filterManager.effectElements[1].p.v ? ((i = this.elem.maskManager.masksProperties.length), (r = 0)) : ((r = this.filterManager.effectElements[0].p.v - 1), (i = r + 1)),
            e = createNS('g'),
            e.setAttribute('fill', 'none'),
            e.setAttribute('stroke-linecap', 'round'),
            e.setAttribute('stroke-dashoffset', 1),
            r;
          r < i;
          r += 1
        )
          (t = createNS('path')), e.appendChild(t), this.paths.push({ p: t, m: r });
        if (3 === this.filterManager.effectElements[10].p.v) {
          var a = createNS('mask'),
            n = 'stms_' + randomString(10);
          a.setAttribute('id', n), a.setAttribute('mask-type', 'alpha'), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
          var o = createNS('g');
          for (o.setAttribute('mask', 'url(' + locationHref + '#' + n + ')'); s[0]; ) o.appendChild(s[0]);
          this.elem.layerElement.appendChild(o), (this.masker = a), e.setAttribute('stroke', '#fff');
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
          if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length; ) this.elem.layerElement.removeChild(s[0]);
          this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute('mask'), e.setAttribute('stroke', '#fff');
        }
        (this.initialized = !0), (this.pathMasker = e);
      }),
      (SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
          r,
          i,
          s = this.paths.length;
        for (e = 0; e < s; e += 1)
          if (
            this.paths[e].m !== -1 &&
            ((r = this.elem.maskManager.viewData[this.paths[e].m]),
            (i = this.paths[e].p),
            (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute('d', r.lastPath),
            t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)
          ) {
            var a;
            if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
              var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                h = i.getTotalLength();
              a = '0 0 0 ' + h * n + ' ';
              var l,
                p = h * (o - n),
                f = 1 + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100,
                m = Math.floor(p / f);
              for (l = 0; l < m; l += 1) a += '1 ' + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100 + ' ';
              a += '0 ' + 10 * h + ' 0 0';
            } else a = '1 ' + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100;
            i.setAttribute('stroke-dasharray', a);
          }
        if (
          ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute('stroke-width', 2 * this.filterManager.effectElements[4].p.v),
          (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute('opacity', this.filterManager.effectElements[6].p.v),
          (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf))
        ) {
          var c = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute('stroke', 'rgb(' + bm_floor(255 * c[0]) + ',' + bm_floor(255 * c[1]) + ',' + bm_floor(255 * c[2]) + ')');
        }
      }),
      (SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            i = this.filterManager.effectElements[2].p.v,
            s = i[0] + ' ' + r[0] + ' ' + e[0],
            a = i[1] + ' ' + r[1] + ' ' + e[1],
            n = i[2] + ' ' + r[2] + ' ' + e[2];
          this.feFuncR.setAttribute('tableValues', s), this.feFuncG.setAttribute('tableValues', a), this.feFuncB.setAttribute('tableValues', n);
        }
      }),
      (SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var r = createNS(t);
        return r.setAttribute('type', 'table'), e.appendChild(r), r;
      }),
      (SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
        for (var a, n, o = 0, h = 256, l = Math.min(t, e), p = Math.max(t, e), f = Array.call(null, { length: h }), m = 0, c = s - i, d = e - t; o <= 256; )
          (a = o / 256), (n = a <= l ? (d < 0 ? s : i) : a >= p ? (d < 0 ? i : s) : i + c * Math.pow((a - t) / d, 1 / r)), (f[m++] = n), (o += 256 / (h - 1));
        return f.join(' ');
      }),
      (SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
            r = this.filterManager.effectElements;
          this.feFuncRComposed &&
            (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) &&
            ((e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v)), this.feFuncRComposed.setAttribute('tableValues', e), this.feFuncGComposed.setAttribute('tableValues', e), this.feFuncBComposed.setAttribute('tableValues', e)),
            this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && ((e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v)), this.feFuncR.setAttribute('tableValues', e)),
            this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && ((e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v)), this.feFuncG.setAttribute('tableValues', e)),
            this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && ((e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v)), this.feFuncB.setAttribute('tableValues', e)),
            this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && ((e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v)), this.feFuncA.setAttribute('tableValues', e));
        }
      }),
      (SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if (((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf)) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute('flood-color', rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
          }
          if (((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute('flood-opacity', this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf)) {
            var r = this.filterManager.effectElements[3].p.v,
              i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
              s = r * Math.cos(i),
              a = r * Math.sin(i);
            this.feOffset.setAttribute('dx', s), this.feOffset.setAttribute('dy', a);
          }
        }
      });
    var _svgMatteSymbols = [],
      _svgMatteMaskCounter = 0;
    (SVGMatte3Effect.prototype.findSymbol = function (t) {
      for (var e = 0, r = _svgMatteSymbols.length; e < r; ) {
        if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
        e += 1;
      }
      return null;
    }),
      (SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var r = t.layerElement.parentNode;
        if (r) {
          for (var i = r.children, s = 0, a = i.length; s < a && i[s] !== t.layerElement; ) s += 1;
          var n;
          s <= a - 2 && (n = i[s + 1]);
          var o = createNS('use');
          o.setAttribute('href', '#' + e), n ? r.insertBefore(o, n) : r.appendChild(o);
        }
      }),
      (SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var r = 'matte_' + randomString(5) + '_' + _svgMatteMaskCounter++,
            i = createNS('mask');
          i.setAttribute('id', e.layerId), i.setAttribute('mask-type', 'alpha'), _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(i);
          var a = createNS('symbol');
          a.setAttribute('id', r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
          var n = createNS('use');
          n.setAttribute('href', '#' + r), i.appendChild(n), (e.data.hd = !1), e.show();
        }
        t.setMatte(e.layerId);
      }),
      (SVGMatte3Effect.prototype.initialize = function () {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i; ) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), (r += 1);
        this.initialized = !0;
      }),
      (SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }),
      (SVGEffects.prototype.renderFrame = function (t) {
        var e,
          r = this.filters.length;
        for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t);
      });
    var animationManager = (function () {
        function t(t) {
          for (var e = 0, r = t.target; e < C; ) S[e].animation === r && (S.splice(e, 1), (e -= 1), (C -= 1), r.isPaused || s()), (e += 1);
        }
        function e(t, e) {
          if (!t) return null;
          for (var r = 0; r < C; ) {
            if (S[r].elem == t && null !== S[r].elem) return S[r].animation;
            r += 1;
          }
          var i = new AnimationItem();
          return a(i, t), i.setData(t, e), i;
        }
        function r() {
          var t,
            e = S.length,
            r = [];
          for (t = 0; t < e; t += 1) r.push(S[t].animation);
          return r;
        }
        function i() {
          (A += 1), b();
        }
        function s() {
          A -= 1;
        }
        function a(e, r) {
          e.addEventListener('destroy', t), e.addEventListener('_active', i), e.addEventListener('_idle', s), S.push({ elem: r, animation: e }), (C += 1);
        }
        function n(t) {
          var e = new AnimationItem();
          return a(e, null), e.setParams(t), e;
        }
        function o(t, e) {
          var r;
          for (r = 0; r < C; r += 1) S[r].animation.setSpeed(t, e);
        }
        function h(t, e) {
          var r;
          for (r = 0; r < C; r += 1) S[r].animation.setDirection(t, e);
        }
        function l(t) {
          var e;
          for (e = 0; e < C; e += 1) S[e].animation.play(t);
        }
        function p(t) {
          var e,
            r = t - _;
          for (e = 0; e < C; e += 1) S[e].animation.advanceTime(r);
          (_ = t), A && !k ? window.requestAnimationFrame(p) : (T = !0);
        }
        function f(t) {
          (_ = t), window.requestAnimationFrame(p);
        }
        function m(t) {
          var e;
          for (e = 0; e < C; e += 1) S[e].animation.pause(t);
        }
        function c(t, e, r) {
          var i;
          for (i = 0; i < C; i += 1) S[i].animation.goToAndStop(t, e, r);
        }
        function d(t) {
          var e;
          for (e = 0; e < C; e += 1) S[e].animation.stop(t);
        }
        function u(t) {
          var e;
          for (e = 0; e < C; e += 1) S[e].animation.togglePause(t);
        }
        function y(t) {
          var e;
          for (e = C - 1; e >= 0; e -= 1) S[e].animation.destroy(t);
        }
        function g(t, r, i) {
          var s,
            a = [].concat([].slice.call(document.getElementsByClassName('lottie')), [].slice.call(document.getElementsByClassName('bodymovin'))),
            n = a.length;
          for (s = 0; s < n; s += 1) i && a[s].setAttribute('data-bm-type', i), e(a[s], t);
          if (r && 0 === n) {
            i || (i = 'svg');
            var o = document.getElementsByTagName('body')[0];
            o.innerHTML = '';
            var h = createTag('div');
            (h.style.width = '100%'), (h.style.height = '100%'), h.setAttribute('data-bm-type', i), o.appendChild(h), e(h, t);
          }
        }
        function v() {
          var t;
          for (t = 0; t < C; t += 1) S[t].animation.resize();
        }
        function b() {
          !k && A && T && (window.requestAnimationFrame(f), (T = !1));
        }
        function x() {
          k = !0;
        }
        function E() {
          (k = !1), b();
        }
        var P = {},
          S = [],
          _ = 0,
          C = 0,
          A = 0,
          T = !0,
          k = !1;
        return (
          (P.registerAnimation = e),
          (P.loadAnimation = n),
          (P.setSpeed = o),
          (P.setDirection = h),
          (P.play = l),
          (P.pause = m),
          (P.stop = d),
          (P.togglePause = u),
          (P.searchAnimations = g),
          (P.resize = v),
          (P.goToAndStop = c),
          (P.destroy = y),
          (P.freeze = x),
          (P.unfreeze = E),
          (P.getRegisteredAnimations = r),
          P
        );
      })(),
      AnimationItem = function () {
        (this._cbs = []),
          (this.name = ''),
          (this.path = ''),
          (this.isLoaded = !1),
          (this.currentFrame = 0),
          (this.currentRawFrame = 0),
          (this.totalFrames = 0),
          (this.frameRate = 0),
          (this.frameMult = 0),
          (this.playSpeed = 1),
          (this.playDirection = 1),
          (this.playCount = 0),
          (this.animationData = {}),
          (this.assets = []),
          (this.isPaused = !0),
          (this.autoplay = !1),
          (this.loop = !0),
          (this.renderer = null),
          (this.animationID = randomString(10)),
          (this.assetsPath = ''),
          (this.timeCompleted = 0),
          (this.segmentPos = 0),
          (this.subframeEnabled = subframeEnabled),
          (this.segments = []),
          (this._idle = !0),
          (this._completedLoop = !1),
          (this.projectInterface = ProjectInterface()),
          (this.imagePreloader = new ImagePreloader());
      };
    extendPrototype([BaseEvent], AnimationItem),
      (AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : 'svg';
        switch (e) {
          case 'canvas':
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;
          case 'svg':
            this.renderer = new SVGRenderer(this, t.rendererSettings);
            break;
          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }
        this.renderer.setProjectInterface(this.projectInterface),
          (this.animType = e),
          '' === t.loop || null === t.loop || (t.loop === !1 ? (this.loop = !1) : t.loop === !0 ? (this.loop = !0) : (this.loop = parseInt(t.loop))),
          (this.autoplay = !('autoplay' in t) || t.autoplay),
          (this.name = t.name ? t.name : ''),
          (this.autoloadSegments = !t.hasOwnProperty('autoloadSegments') || t.autoloadSegments),
          (this.assetsPath = t.assetsPath),
          t.animationData
            ? this.configAnimation(t.animationData)
            : t.path &&
              ('json' != t.path.substr(-4) && ('/' != t.path.substr(-1, 1) && (t.path += '/'), (t.path += 'data.json')),
              t.path.lastIndexOf('\\') != -1 ? (this.path = t.path.substr(0, t.path.lastIndexOf('\\') + 1)) : (this.path = t.path.substr(0, t.path.lastIndexOf('/') + 1)),
              (this.fileName = t.path.substr(t.path.lastIndexOf('/') + 1)),
              (this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.json'))),
              assetLoader.load(
                t.path,
                this.configAnimation.bind(this),
                function () {
                  this.trigger('data_failed');
                }.bind(this)
              ));
      }),
      (AnimationItem.prototype.setData = function (t, e) {
        var r = { wrapper: t, animationData: e ? ('object' == typeof e ? e : JSON.parse(e)) : null },
          i = t.attributes;
        (r.path = i.getNamedItem('data-animation-path') ? i.getNamedItem('data-animation-path').value : i.getNamedItem('data-bm-path') ? i.getNamedItem('data-bm-path').value : i.getNamedItem('bm-path') ? i.getNamedItem('bm-path').value : ''),
          (r.animType = i.getNamedItem('data-anim-type')
            ? i.getNamedItem('data-anim-type').value
            : i.getNamedItem('data-bm-type')
            ? i.getNamedItem('data-bm-type').value
            : i.getNamedItem('bm-type')
            ? i.getNamedItem('bm-type').value
            : i.getNamedItem('data-bm-renderer')
            ? i.getNamedItem('data-bm-renderer').value
            : i.getNamedItem('bm-renderer')
            ? i.getNamedItem('bm-renderer').value
            : 'canvas');
        var s = i.getNamedItem('data-anim-loop') ? i.getNamedItem('data-anim-loop').value : i.getNamedItem('data-bm-loop') ? i.getNamedItem('data-bm-loop').value : i.getNamedItem('bm-loop') ? i.getNamedItem('bm-loop').value : '';
        '' === s || ('false' === s ? (r.loop = !1) : 'true' === s ? (r.loop = !0) : (r.loop = parseInt(s)));
        var a = i.getNamedItem('data-anim-autoplay') ? i.getNamedItem('data-anim-autoplay').value : i.getNamedItem('data-bm-autoplay') ? i.getNamedItem('data-bm-autoplay').value : !i.getNamedItem('bm-autoplay') || i.getNamedItem('bm-autoplay').value;
        (r.autoplay = 'false' !== a), (r.name = i.getNamedItem('data-name') ? i.getNamedItem('data-name').value : i.getNamedItem('data-bm-name') ? i.getNamedItem('data-bm-name').value : i.getNamedItem('bm-name') ? i.getNamedItem('bm-name').value : '');
        var n = i.getNamedItem('data-anim-prerender') ? i.getNamedItem('data-anim-prerender').value : i.getNamedItem('data-bm-prerender') ? i.getNamedItem('data-bm-prerender').value : i.getNamedItem('bm-prerender') ? i.getNamedItem('bm-prerender').value : '';
        'false' === n && (r.prerender = !1), this.setParams(r);
      }),
      (AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op && ((this.animationData.op = t.op), (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
        var e,
          r,
          i = this.animationData.layers,
          s = i.length,
          a = t.layers,
          n = a.length;
        for (r = 0; r < n; r += 1)
          for (e = 0; e < s; ) {
            if (i[e].id == a[r].id) {
              i[e] = a[r];
              break;
            }
            e += 1;
          }
        if (((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets))
          for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
        (this.animationData.__complete = !1), dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
      }),
      (AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger('data_ready'), void (this.timeCompleted = this.totalFrames);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + '_' + this.segmentPos + '.json';
        (this.segmentPos += 1),
          assetLoader.load(
            r,
            this.includeLayers.bind(this),
            function () {
              this.trigger('data_failed');
            }.bind(this)
          );
      }),
      (AnimationItem.prototype.loadSegments = function () {
        var t = this.animationData.segments;
        t || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }),
      (AnimationItem.prototype.imagesLoaded = function () {
        this.trigger('loaded_images'), this.checkLoaded();
      }),
      (AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }),
      (AnimationItem.prototype.configAnimation = function (t) {
        this.renderer &&
          ((this.animationData = t),
          (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip)),
          this.renderer.configAnimation(t),
          t.assets || (t.assets = []),
          this.renderer.searchExtraCompositions(t.assets),
          (this.assets = this.animationData.assets),
          (this.frameRate = this.animationData.fr),
          (this.firstFrame = Math.round(this.animationData.ip)),
          (this.frameMult = this.animationData.fr / 1e3),
          this.trigger('config_ready'),
          this.preloadImages(),
          this.loadSegments(),
          this.updaFrameModifier(),
          this.waitForFontsLoaded());
      }),
      (AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }),
      (AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded ||
          !this.renderer.globalData.fontManager.loaded() ||
          (!this.imagePreloader.loaded() && 'canvas' === this.renderer.rendererType) ||
          ((this.isLoaded = !0),
          dataManager.completeData(this.animationData, this.renderer.globalData.fontManager),
          expressionsPlugin && expressionsPlugin.initExpressions(this),
          this.renderer.initItems(),
          setTimeout(
            function () {
              this.trigger('DOMLoaded');
            }.bind(this),
            0
          ),
          this.gotoFrame(),
          this.autoplay && this.play());
      }),
      (AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }),
      (AnimationItem.prototype.setSubframe = function (t) {
        this.subframeEnabled = !!t;
      }),
      (AnimationItem.prototype.gotoFrame = function () {
        (this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame),
          this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted),
          this.trigger('enterFrame'),
          this.renderFrame();
      }),
      (AnimationItem.prototype.renderFrame = function () {
        this.isLoaded !== !1 && this.renderer.renderFrame(this.currentFrame + this.firstFrame);
      }),
      (AnimationItem.prototype.play = function (t) {
        (t && this.name != t) || (this.isPaused === !0 && ((this.isPaused = !1), this._idle && ((this._idle = !1), this.trigger('_active'))));
      }),
      (AnimationItem.prototype.pause = function (t) {
        (t && this.name != t) || (this.isPaused === !1 && ((this.isPaused = !0), (this._idle = !0), this.trigger('_idle')));
      }),
      (AnimationItem.prototype.togglePause = function (t) {
        (t && this.name != t) || (this.isPaused === !0 ? this.play() : this.pause());
      }),
      (AnimationItem.prototype.stop = function (t) {
        (t && this.name != t) || (this.pause(), (this.playCount = 0), (this._completedLoop = !1), this.setCurrentRawFrameValue(0));
      }),
      (AnimationItem.prototype.goToAndStop = function (t, e, r) {
        (r && this.name != r) || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
      }),
      (AnimationItem.prototype.goToAndPlay = function (t, e, r) {
        this.goToAndStop(t, e, r), this.play();
      }),
      (AnimationItem.prototype.advanceTime = function (t) {
        if (this.isPaused !== !0 && this.isLoaded !== !1) {
          var e = this.currentRawFrame + t * this.frameModifier,
            r = !1;
          e >= this.totalFrames - 1 && this.frameModifier > 0
            ? this.loop && this.playCount !== this.loop
              ? e >= this.totalFrames
                ? ((this.playCount += 1), this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), (this._completedLoop = !0), this.trigger('loopComplete')))
                : this.setCurrentRawFrameValue(e)
              : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || ((r = !0), (e = this.totalFrames - 1))
            : e < 0
            ? this.checkSegments(e % this.totalFrames) ||
              (!this.loop || (this.playCount-- <= 0 && this.loop !== !0) ? ((r = !0), (e = 0)) : (this.setCurrentRawFrameValue(this.totalFrames + (e % this.totalFrames)), this._completedLoop ? this.trigger('loopComplete') : (this._completedLoop = !0)))
            : this.setCurrentRawFrameValue(e),
            r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger('complete'));
        }
      }),
      (AnimationItem.prototype.adjustSegment = function (t, e) {
        (this.playCount = 0),
          t[1] < t[0]
            ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), (this.timeCompleted = this.totalFrames = t[0] - t[1]), (this.firstFrame = t[1]), this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
            : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), (this.timeCompleted = this.totalFrames = t[1] - t[0]), (this.firstFrame = t[0]), this.setCurrentRawFrameValue(0.001 + e)),
          this.trigger('segmentStart');
      }),
      (AnimationItem.prototype.setSegment = function (t, e) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? (r = t) : this.currentRawFrame + this.firstFrame > e && (r = e - t)), (this.firstFrame = t), (this.timeCompleted = this.totalFrames = e - t), r !== -1 && this.goToAndStop(r, !0);
      }),
      (AnimationItem.prototype.playSegments = function (t, e) {
        if ((e && (this.segments.length = 0), 'object' == typeof t[0])) {
          var r,
            i = t.length;
          for (r = 0; r < i; r += 1) this.segments.push(t[r]);
        } else this.segments.push(t);
        this.segments.length && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }),
      (AnimationItem.prototype.resetSegments = function (t) {
        (this.segments.length = 0), this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
      }),
      (AnimationItem.prototype.checkSegments = function (t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
      }),
      (AnimationItem.prototype.destroy = function (t) {
        (t && this.name != t) ||
          !this.renderer ||
          (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger('destroy'), (this._cbs = null), (this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null), (this.renderer = null));
      }),
      (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        (this.currentRawFrame = t), this.gotoFrame();
      }),
      (AnimationItem.prototype.setSpeed = function (t) {
        (this.playSpeed = t), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.setDirection = function (t) {
        (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
      }),
      (AnimationItem.prototype.getPath = function () {
        return this.path;
      }),
      (AnimationItem.prototype.getAssetsPath = function (t) {
        var e = '';
        if (t.e) e = t.p;
        else if (this.assetsPath) {
          var r = t.p;
          r.indexOf('images/') !== -1 && (r = r.split('/')[1]), (e = this.assetsPath + r);
        } else (e = this.path), (e += t.u ? t.u : ''), (e += t.p);
        return e;
      }),
      (AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, r = this.assets.length; e < r; ) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }),
      (AnimationItem.prototype.hide = function () {
        this.renderer.hide();
      }),
      (AnimationItem.prototype.show = function () {
        this.renderer.show();
      }),
      (AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }),
      (AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t])
          switch (t) {
            case 'enterFrame':
              this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult));
              break;
            case 'loopComplete':
              this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
              break;
            case 'complete':
              this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
              break;
            case 'segmentStart':
              this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
              break;
            case 'destroy':
              this.triggerEvent(t, new BMDestroyEvent(t, this));
              break;
            default:
              this.triggerEvent(t);
          }
        'enterFrame' === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)),
          'loopComplete' === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)),
          'complete' === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)),
          'segmentStart' === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)),
          'destroy' === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
      }),
      extendPrototype([BaseRenderer], CanvasRenderer),
      (CanvasRenderer.prototype.createShape = function (t) {
        return new CVShapeElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createText = function (t) {
        return new CVTextElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createImage = function (t) {
        return new CVImageElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createComp = function (t) {
        return new CVCompElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createSolid = function (t) {
        return new CVSolidElement(t, this.globalData, this);
      }),
      (CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull),
      (CanvasRenderer.prototype.ctxTransform = function (t) {
        if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) {
          if (!this.renderConfig.clearCanvas) return void this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
          this.transformMat.cloneFromProps(t);
          var e = this.contextData.cTr.props;
          this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
          var r = this.contextData.cTr.props;
          this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
        }
      }),
      (CanvasRenderer.prototype.ctxOpacity = function (t) {
        return this.renderConfig.clearCanvas
          ? ((this.contextData.cO *= t < 0 ? 0 : t), void (this.globalData.currentGlobalAlpha !== this.contextData.cO && ((this.canvasContext.globalAlpha = this.contextData.cO), (this.globalData.currentGlobalAlpha = this.contextData.cO))))
          : ((this.canvasContext.globalAlpha *= t < 0 ? 0 : t), void (this.globalData.currentGlobalAlpha = this.contextData.cO));
      }),
      (CanvasRenderer.prototype.reset = function () {
        return this.renderConfig.clearCanvas ? void this.contextData.reset() : void this.canvasContext.restore();
      }),
      (CanvasRenderer.prototype.save = function (t) {
        if (!this.renderConfig.clearCanvas) return void this.canvasContext.save();
        t && this.canvasContext.save();
        var e = this.contextData.cTr.props;
        this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
        var r,
          i = this.contextData.saved[this.contextData.cArrPos];
        for (r = 0; r < 16; r += 1) i[r] = e[r];
        (this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO), (this.contextData.cArrPos += 1);
      }),
      (CanvasRenderer.prototype.restore = function (t) {
        if (!this.renderConfig.clearCanvas) return void this.canvasContext.restore();
        t && (this.canvasContext.restore(), (this.globalData.blendMode = 'source-over')), (this.contextData.cArrPos -= 1);
        var e,
          r = this.contextData.saved[this.contextData.cArrPos],
          i = this.contextData.cTr.props;
        for (e = 0; e < 16; e += 1) i[e] = r[e];
        this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]),
          (r = this.contextData.savedOp[this.contextData.cArrPos]),
          (this.contextData.cO = r),
          this.globalData.currentGlobalAlpha !== r && ((this.canvasContext.globalAlpha = r), (this.globalData.currentGlobalAlpha = r));
      }),
      (CanvasRenderer.prototype.configAnimation = function (t) {
        this.animationItem.wrapper
          ? ((this.animationItem.container = createTag('canvas')),
            (this.animationItem.container.style.width = '100%'),
            (this.animationItem.container.style.height = '100%'),
            (this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style['-webkit-transform'] = '0px 0px 0px'),
            this.animationItem.wrapper.appendChild(this.animationItem.container),
            (this.canvasContext = this.animationItem.container.getContext('2d')),
            this.renderConfig.className && this.animationItem.container.setAttribute('class', this.renderConfig.className))
          : (this.canvasContext = this.renderConfig.context),
          (this.data = t),
          (this.layers = t.layers),
          (this.transformCanvas = { w: t.w, h: t.h, sx: 0, sy: 0, tx: 0, ty: 0 }),
          this.setupGlobalData(t, document.body),
          (this.globalData.canvasContext = this.canvasContext),
          (this.globalData.renderer = this),
          (this.globalData.isDashed = !1),
          (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
          (this.globalData.transformCanvas = this.transformCanvas),
          (this.elements = createSizedArray(t.layers.length)),
          this.updateContainerSize();
      }),
      (CanvasRenderer.prototype.updateContainerSize = function () {
        this.reset();
        var t, e;
        this.animationItem.wrapper && this.animationItem.container
          ? ((t = this.animationItem.wrapper.offsetWidth),
            (e = this.animationItem.wrapper.offsetHeight),
            this.animationItem.container.setAttribute('width', t * this.renderConfig.dpr),
            this.animationItem.container.setAttribute('height', e * this.renderConfig.dpr))
          : ((t = this.canvasContext.canvas.width * this.renderConfig.dpr), (e = this.canvasContext.canvas.height * this.renderConfig.dpr));
        var r, i;
        if (this.renderConfig.preserveAspectRatio.indexOf('meet') !== -1 || this.renderConfig.preserveAspectRatio.indexOf('slice') !== -1) {
          var s = this.renderConfig.preserveAspectRatio.split(' '),
            a = s[1] || 'meet',
            n = s[0] || 'xMidYMid',
            o = n.substr(0, 4),
            h = n.substr(4);
          (r = t / e),
            (i = this.transformCanvas.w / this.transformCanvas.h),
            (i > r && 'meet' === a) || (i < r && 'slice' === a)
              ? ((this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr)), (this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)))
              : ((this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr)), (this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr))),
            'xMid' === o && ((i < r && 'meet' === a) || (i > r && 'slice' === a))
              ? (this.transformCanvas.tx = ((t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2) * this.renderConfig.dpr)
              : 'xMax' === o && ((i < r && 'meet' === a) || (i > r && 'slice' === a))
              ? (this.transformCanvas.tx = (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr)
              : (this.transformCanvas.tx = 0),
            'YMid' === h && ((i > r && 'meet' === a) || (i < r && 'slice' === a))
              ? (this.transformCanvas.ty = ((e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2) * this.renderConfig.dpr)
              : 'YMax' === h && ((i > r && 'meet' === a) || (i < r && 'slice' === a))
              ? (this.transformCanvas.ty = (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr)
              : (this.transformCanvas.ty = 0);
        } else
          'none' == this.renderConfig.preserveAspectRatio
            ? ((this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr)), (this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), (this.transformCanvas.tx = 0), (this.transformCanvas.ty = 0))
            : ((this.transformCanvas.sx = this.renderConfig.dpr), (this.transformCanvas.sy = this.renderConfig.dpr), (this.transformCanvas.tx = 0), (this.transformCanvas.ty = 0));
        (this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1]),
          this.ctxTransform(this.transformCanvas.props),
          this.canvasContext.beginPath(),
          this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h),
          this.canvasContext.closePath(),
          this.canvasContext.clip();
      }),
      (CanvasRenderer.prototype.destroy = function () {
        this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = '');
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = e - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
        (this.elements.length = 0), (this.globalData.canvasContext = null), (this.animationItem.container = null), (this.destroyed = !0);
      }),
      (CanvasRenderer.prototype.renderFrame = function (t) {
        if (!((this.renderedFrame == t && this.renderConfig.clearCanvas === !0) || this.destroyed || t === -1)) {
          (this.renderedFrame = t), (this.globalData.frameNum = t - this.animationItem._isFirstFrame), (this.globalData.frameId += 1), (this.globalData._mdf = !this.renderConfig.clearCanvas), (this.globalData.projectInterface.currentFrame = t);
          var e,
            r = this.layers.length;
          for (this.completeLayers || this.checkLayers(t), e = 0; e < r; e++) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
          if (this.globalData._mdf) {
            for (this.renderConfig.clearCanvas === !0 ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), e = r - 1; e >= 0; e -= 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
            this.renderConfig.clearCanvas !== !0 && this.restore();
          }
        }
      }),
      (CanvasRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
          var r = this.createItem(this.layers[t], this, this.globalData);
          (e[t] = r), r.initExpressions();
        }
      }),
      (CanvasRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          t.checkParenting();
        }
      }),
      (CanvasRenderer.prototype.hide = function () {
        this.animationItem.container.style.display = 'none';
      }),
      (CanvasRenderer.prototype.show = function () {
        this.animationItem.container.style.display = 'block';
      }),
      extendPrototype([BaseRenderer], HybridRenderer),
      (HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem),
      (HybridRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          t.checkParenting();
        }
      }),
      (HybridRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();
        if (r) {
          var i = this.layers[e];
          if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
          else if (this.threeDElements) this.addTo3dContainer(r, e);
          else {
            for (var s, a, n, o = 0; o < e; ) this.elements[o] && this.elements[o] !== !0 && this.elements[o].getBaseElement && ((a = this.elements[o]), (n = this.layers[o].ddd ? this.getThreeDContainerByPos(o) : a.getBaseElement()), (s = n || s)), (o += 1);
            s ? (i.ddd && this.supports3d) || this.layerElement.insertBefore(r, s) : (i.ddd && this.supports3d) || this.layerElement.appendChild(r);
          }
        }
      }),
      (HybridRenderer.prototype.createShape = function (t) {
        return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createText = function (t) {
        return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createCamera = function (t) {
        return (this.camera = new HCameraElement(t, this.globalData, this)), this.camera;
      }),
      (HybridRenderer.prototype.createImage = function (t) {
        return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createComp = function (t) {
        return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createSolid = function (t) {
        return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
      }),
      (HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull),
      (HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
        for (var e = 0, r = this.threeDElements.length; e < r; ) {
          if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
          e += 1;
        }
      }),
      (HybridRenderer.prototype.createThreeDContainer = function (t, e) {
        var r = createTag('div');
        styleDiv(r);
        var i = createTag('div');
        styleDiv(i),
          '3d' === e &&
            ((r.style.width = this.globalData.compSize.w + 'px'),
            (r.style.height = this.globalData.compSize.h + 'px'),
            (r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = '50% 50%'),
            (i.style.transform = i.style.webkitTransform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)')),
          r.appendChild(i);
        var s = { container: i, perspectiveElem: r, startPos: t, endPos: t, type: e };
        return this.threeDElements.push(s), s;
      }),
      (HybridRenderer.prototype.build3dContainers = function () {
        var t,
          e,
          r = this.layers.length,
          i = '';
        for (t = 0; t < r; t += 1)
          this.layers[t].ddd && 3 !== this.layers[t].ty
            ? ('3d' !== i && ((i = '3d'), (e = this.createThreeDContainer(t, '3d'))), (e.endPos = Math.max(e.endPos, t)))
            : ('2d' !== i && ((i = '2d'), (e = this.createThreeDContainer(t, '2d'))), (e.endPos = Math.max(e.endPos, t)));
        for (r = this.threeDElements.length, t = r - 1; t >= 0; t--) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
      }),
      (HybridRenderer.prototype.addTo3dContainer = function (t, e) {
        for (var r = 0, i = this.threeDElements.length; r < i; ) {
          if (e <= this.threeDElements[r].endPos) {
            for (var s, a = this.threeDElements[r].startPos; a < e; ) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), (a += 1);
            s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
            break;
          }
          r += 1;
        }
      }),
      (HybridRenderer.prototype.configAnimation = function (t) {
        var e = createTag('div'),
          r = this.animationItem.wrapper;
        (e.style.width = t.w + 'px'),
          (e.style.height = t.h + 'px'),
          (this.resizerElem = e),
          styleDiv(e),
          (e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = 'flat'),
          this.renderConfig.className && e.setAttribute('class', this.renderConfig.className),
          r.appendChild(e),
          (e.style.overflow = 'hidden');
        var i = createNS('svg');
        i.setAttribute('width', '1'), i.setAttribute('height', '1'), styleDiv(i), this.resizerElem.appendChild(i);
        var s = createNS('defs');
        i.appendChild(s), (this.data = t), this.setupGlobalData(t, i), (this.globalData.defs = s), (this.layers = t.layers), (this.layerElement = this.resizerElem), this.build3dContainers(), this.updateContainerSize();
      }),
      (HybridRenderer.prototype.destroy = function () {
        (this.animationItem.wrapper.innerHTML = ''), (this.animationItem.container = null), (this.globalData.defs = null);
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t].destroy();
        (this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null);
      }),
      (HybridRenderer.prototype.updateContainerSize = function () {
        var t,
          e,
          r,
          i,
          s = this.animationItem.wrapper.offsetWidth,
          a = this.animationItem.wrapper.offsetHeight,
          n = s / a,
          o = this.globalData.compSize.w / this.globalData.compSize.h;
        o > n
          ? ((t = s / this.globalData.compSize.w), (e = s / this.globalData.compSize.w), (r = 0), (i = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2))
          : ((t = a / this.globalData.compSize.h), (e = a / this.globalData.compSize.h), (r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2), (i = 0)),
          (this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = 'matrix3d(' + t + ',0,0,0,0,' + e + ',0,0,0,0,1,0,' + r + ',' + i + ',0,1)');
      }),
      (HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame),
      (HybridRenderer.prototype.hide = function () {
        this.resizerElem.style.display = 'none';
      }),
      (HybridRenderer.prototype.show = function () {
        this.resizerElem.style.display = 'block';
      }),
      (HybridRenderer.prototype.initItems = function () {
        if ((this.buildAllItems(), this.camera)) this.camera.setup();
        else {
          var t,
            e = this.globalData.compSize.w,
            r = this.globalData.compSize.h,
            i = this.threeDElements.length;
          for (t = 0; t < i; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + 'px';
        }
      }),
      (HybridRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
          r = t.length,
          i = createTag('div');
        for (e = 0; e < r; e += 1)
          if (t[e].xt) {
            var s = this.createComp(t[e], i, this.globalData.comp, null);
            s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
          }
      }),
      (CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated),
      (CVContextData.prototype.duplicate = function () {
        var t = 2 * this._length,
          e = this.savedOp;
        (this.savedOp = createTypedArray('float32', t)), this.savedOp.set(e);
        var r = 0;
        for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray('float32', 16);
        this._length = t;
      }),
      (CVContextData.prototype.reset = function () {
        (this.cArrPos = 0), this.cTr.reset(), (this.cO = 1);
      }),
      (CVBaseElement.prototype = {
        createElements: function () {},
        initRendererElement: function () {},
        createContainerElements: function () {
          (this.canvasContext = this.globalData.canvasContext), (this.renderableEffectsManager = new CVEffects(this));
        },
        createContent: function () {},
        setBlendMode: function () {
          var t = this.globalData;
          if (t.blendMode !== this.data.bm) {
            t.blendMode = this.data.bm;
            var e = this.getBlendMode();
            t.canvasContext.globalCompositeOperation = e;
          }
        },
        createRenderableComponents: function () {
          this.maskManager = new CVMaskElement(this.data, this);
        },
        hideElement: function () {
          this.hidden || (this.isInRange && !this.isTransparent) || (this.hidden = !0);
        },
        showElement: function () {
          this.isInRange && !this.isTransparent && ((this.hidden = !1), (this._isFirstFrame = !0), (this.maskManager._isFirstFrame = !0));
        },
        renderFrame: function () {
          this.hidden ||
            this.data.hd ||
            (this.renderTransform(),
            this.renderRenderable(),
            this.setBlendMode(),
            this.globalData.renderer.save(),
            this.globalData.renderer.ctxTransform(this.finalTransform.mat.props),
            this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v),
            this.renderInnerContent(),
            this.globalData.renderer.restore(),
            this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
            this._isFirstFrame && (this._isFirstFrame = !1));
        },
        destroy: function () {
          (this.canvasContext = null), (this.data = null), (this.globalData = null), this.maskManager.destroy();
        },
        mHelper: new Matrix(),
      }),
      (CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement),
      (CVBaseElement.prototype.show = CVBaseElement.prototype.showElement),
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement),
      (CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement),
      (CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
      (CVImageElement.prototype.createContent = function () {
        if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
          var t = createTag('canvas');
          (t.width = this.assetData.w), (t.height = this.assetData.h);
          var e,
            r,
            i = t.getContext('2d'),
            s = this.img.width,
            a = this.img.height,
            n = s / a,
            o = this.assetData.w / this.assetData.h,
            h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
          (n > o && 'xMidYMid slice' === h) || (n < o && 'xMidYMid slice' !== h) ? ((r = a), (e = r * o)) : ((e = s), (r = e / o)), i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), (this.img = t);
        }
      }),
      (CVImageElement.prototype.renderInnerContent = function (t) {
        this.failed || this.canvasContext.drawImage(this.img, 0, 0);
      }),
      (CVImageElement.prototype.destroy = function () {
        this.img = null;
      }),
      extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement),
      (CVCompElement.prototype.renderInnerContent = function () {
        var t,
          e = this.layers.length;
        for (t = e - 1; t >= 0; t -= 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
      }),
      (CVCompElement.prototype.destroy = function () {
        var t,
          e = this.layers.length;
        for (t = e - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
        (this.layers = null), (this.elements = null);
      }),
      (CVMaskElement.prototype.renderFrame = function () {
        if (this.hasMasks) {
          var t,
            e,
            r,
            i,
            s = this.element.finalTransform.mat,
            a = this.element.canvasContext,
            n = this.masksProperties.length;
          for (a.beginPath(), t = 0; t < n; t++)
            if ('n' !== this.masksProperties[t].mode) {
              this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)),
                (i = this.viewData[t].v),
                (e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0)),
                a.moveTo(e[0], e[1]);
              var o,
                h = i._length;
              for (o = 1; o < h; o++) (r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o])), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
              (r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0])), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
            }
          this.element.globalData.renderer.save(!0), a.clip();
        }
      }),
      (CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty),
      (CVMaskElement.prototype.destroy = function () {
        this.element = null;
      }),
      extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement),
      (CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement),
      (CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: !1 }),
      (CVShapeElement.prototype.dashResetter = []),
      (CVShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
      }),
      (CVShapeElement.prototype.createStyleElement = function (t, e) {
        var r = this.transformsManager.addTransformSequence(e),
          i = { data: t, type: t.ty, preTransforms: r, transforms: [], elements: [], closed: t.hd === !0 },
          s = {};
        if (
          ('fl' == t.ty || 'st' == t.ty
            ? ((s.c = PropertyFactory.getProp(this, t.c, 1, 255, this)), s.c.k || (i.co = 'rgb(' + bm_floor(s.c.v[0]) + ',' + bm_floor(s.c.v[1]) + ',' + bm_floor(s.c.v[2]) + ')'))
            : ('gf' !== t.ty && 'gs' !== t.ty) ||
              ((s.s = PropertyFactory.getProp(this, t.s, 1, null, this)),
              (s.e = PropertyFactory.getProp(this, t.e, 1, null, this)),
              (s.h = PropertyFactory.getProp(this, t.h || { k: 0 }, 0, 0.01, this)),
              (s.a = PropertyFactory.getProp(this, t.a || { k: 0 }, 0, degToRads, this)),
              (s.g = new GradientProperty(this, t.g, this))),
          (s.o = PropertyFactory.getProp(this, t.o, 0, 0.01, this)),
          'st' == t.ty || 'gs' == t.ty)
        ) {
          if (((i.lc = this.lcEnum[t.lc] || 'round'), (i.lj = this.ljEnum[t.lj] || 'round'), 1 == t.lj && (i.ml = t.ml), (s.w = PropertyFactory.getProp(this, t.w, 0, null, this)), s.w.k || (i.wi = s.w.v), t.d)) {
            var a = new DashProperty(this, t.d, 'canvas');
            (s.d = a), s.d.k || ((i.da = s.d.dashArray), (i['do'] = s.d.dashoffset[0]));
          }
        } else i.r = 2 === t.r ? 'evenodd' : 'nonzero';
        return this.stylesList.push(i), (s.style = i), s;
      }),
      (CVShapeElement.prototype.createGroupElement = function (t) {
        var e = { it: [], prevViewData: [] };
        return e;
      }),
      (CVShapeElement.prototype.createTransformElement = function (t) {
        var e = { transform: { opacity: 1, _opMdf: !1, key: this.transformsManager.getNewKey(), op: PropertyFactory.getProp(this, t.o, 0, 0.01, this), mProps: TransformPropertyFactory.getTransformProperty(this, t, this) } };
        return e;
      }),
      (CVShapeElement.prototype.createShapeElement = function (t) {
        var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
        return this.shapes.push(e), this.addShapeToModifiers(e), e;
      }),
      (CVShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
          e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
        this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
      }),
      (CVShapeElement.prototype.addTransformToStyleList = function (t) {
        var e,
          r = this.stylesList.length;
        for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
      }),
      (CVShapeElement.prototype.removeTransformFromStyleList = function () {
        var t,
          e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop();
      }),
      (CVShapeElement.prototype.closeStyles = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) t[e].closed = !0;
      }),
      (CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
        var a,
          n,
          o,
          h,
          l,
          p,
          f = t.length - 1,
          m = [],
          c = [],
          d = [].concat(s);
        for (a = f; a >= 0; a -= 1) {
          if (((h = this.searchProcessedElement(t[a])), h ? (e[a] = r[h - 1]) : (t[a]._shouldRender = i), 'fl' == t[a].ty || 'st' == t[a].ty || 'gf' == t[a].ty || 'gs' == t[a].ty))
            h ? (e[a].style.closed = !1) : (e[a] = this.createStyleElement(t[a], d)), m.push(e[a].style);
          else if ('gr' == t[a].ty) {
            if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n];
            else e[a] = this.createGroupElement(t[a]);
            this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d);
          } else
            'tr' == t[a].ty
              ? h || ((p = this.createTransformElement(t[a])), (e[a] = p), d.push(p), this.addTransformToStyleList(p))
              : 'sh' == t[a].ty || 'rc' == t[a].ty || 'el' == t[a].ty || 'sr' == t[a].ty
              ? h || (e[a] = this.createShapeElement(t[a]))
              : 'tm' == t[a].ty || 'rd' == t[a].ty
              ? (h ? ((l = e[a]), (l.closed = !1)) : ((l = ShapeModifiers.getModifier(t[a].ty)), l.init(this, t[a]), (e[a] = l), this.shapeModifiers.push(l)), c.push(l))
              : 'rp' == t[a].ty && (h ? ((l = e[a]), (l.closed = !0)) : ((l = ShapeModifiers.getModifier(t[a].ty)), (e[a] = l), l.init(this, t, a, e), this.shapeModifiers.push(l), (i = !1)), c.push(l));
          this.addProcessedElement(t[a], a + 1);
        }
        for (this.removeTransformFromStyleList(), this.closeStyles(m), f = c.length, a = 0; a < f; a += 1) c[a].closed = !0;
      }),
      (CVShapeElement.prototype.renderInnerContent = function () {
        (this.transformHelper.opacity = 1), (this.transformHelper._opMdf = !1), this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
      }),
      (CVShapeElement.prototype.renderShapeTransform = function (t, e) {
        (t._opMdf || e.op._mdf || this._isFirstFrame) && ((e.opacity = t.opacity), (e.opacity *= e.op.v), (e._opMdf = !0));
      }),
      (CVShapeElement.prototype.drawLayer = function () {
        var t,
          e,
          r,
          i,
          s,
          a,
          n,
          o,
          h,
          l = this.stylesList.length,
          p = this.globalData.renderer,
          f = this.globalData.canvasContext;
        for (t = 0; t < l; t += 1)
          if (((h = this.stylesList[t]), (o = h.type), (('st' !== o && 'gs' !== o) || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha)) {
            for (
              p.save(),
                a = h.elements,
                'st' === o || 'gs' === o ? ((f.strokeStyle = 'st' === o ? h.co : h.grd), (f.lineWidth = h.wi), (f.lineCap = h.lc), (f.lineJoin = h.lj), (f.miterLimit = h.ml || 0)) : (f.fillStyle = 'fl' === o ? h.co : h.grd),
                p.ctxOpacity(h.coOp),
                'st' !== o && 'gs' !== o && f.beginPath(),
                p.ctxTransform(h.preTransforms.finalTransform.props),
                r = a.length,
                e = 0;
              e < r;
              e += 1
            ) {
              for (('st' !== o && 'gs' !== o) || (f.beginPath(), h.da && (f.setLineDash(h.da), (f.lineDashOffset = h['do']))), n = a[e].trNodes, s = n.length, i = 0; i < s; i += 1)
                'm' == n[i].t ? f.moveTo(n[i].p[0], n[i].p[1]) : 'c' == n[i].t ? f.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : f.closePath();
              ('st' !== o && 'gs' !== o) || (f.stroke(), h.da && f.setLineDash(this.dashResetter));
            }
            'st' !== o && 'gs' !== o && f.fill(h.r), p.restore();
          }
      }),
      (CVShapeElement.prototype.renderShape = function (t, e, r, i) {
        var s,
          a,
          n = e.length - 1;
        for (a = t, s = n; s >= 0; s -= 1)
          'tr' == e[s].ty
            ? ((a = r[s].transform), this.renderShapeTransform(t, a))
            : 'sh' == e[s].ty || 'el' == e[s].ty || 'rc' == e[s].ty || 'sr' == e[s].ty
            ? this.renderPath(e[s], r[s])
            : 'fl' == e[s].ty
            ? this.renderFill(e[s], r[s], a)
            : 'st' == e[s].ty
            ? this.renderStroke(e[s], r[s], a)
            : 'gf' == e[s].ty || 'gs' == e[s].ty
            ? this.renderGradientFill(e[s], r[s], a)
            : 'gr' == e[s].ty
            ? this.renderShape(a, e[s].it, r[s].it)
            : 'tm' == e[s].ty;
        i && this.drawLayer();
      }),
      (CVShapeElement.prototype.renderStyledShape = function (t, e) {
        if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
          var r,
            i,
            s,
            a = t.trNodes,
            n = e.paths,
            o = n._length;
          a.length = 0;
          var h = t.transforms.finalTransform;
          for (s = 0; s < o; s += 1) {
            var l = n.shapes[s];
            if (l && l.v) {
              for (i = l._length, r = 1; r < i; r += 1) 1 === r && a.push({ t: 'm', p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0) }), a.push({ t: 'c', pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r]) });
              1 === i && a.push({ t: 'm', p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0) }), l.c && i && (a.push({ t: 'c', pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0]) }), a.push({ t: 'z' }));
            }
          }
          t.trNodes = a;
        }
      }),
      (CVShapeElement.prototype.renderPath = function (t, e) {
        if (t.hd !== !0 && t._shouldRender) {
          var r,
            i = e.styledShapes.length;
          for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh);
        }
      }),
      (CVShapeElement.prototype.renderFill = function (t, e, r) {
        var i = e.style;
        (e.c._mdf || this._isFirstFrame) && (i.co = 'rgb(' + bm_floor(e.c.v[0]) + ',' + bm_floor(e.c.v[1]) + ',' + bm_floor(e.c.v[2]) + ')'), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity);
      }),
      (CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
        var i = e.style;
        if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || (1 !== t.t && (e.h._mdf || e.a._mdf))) {
          var s,
            a = this.globalData.canvasContext,
            n = e.s.v,
            o = e.e.v;
          if (1 === t.t) s = a.createLinearGradient(n[0], n[1], o[0], o[1]);
          else
            var h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2)),
              l = Math.atan2(o[1] - n[1], o[0] - n[0]),
              p = e.h.v >= 1 ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v,
              f = h * p,
              m = Math.cos(l + e.a.v) * f + n[0],
              c = Math.sin(l + e.a.v) * f + n[1],
              s = a.createRadialGradient(m, c, 0, n[0], n[1], h);
          var d,
            u = t.g.p,
            y = e.g.c,
            g = 1;
          for (d = 0; d < u; d += 1) e.g._hasOpacity && e.g._collapsable && (g = e.g.o[2 * d + 1]), s.addColorStop(y[4 * d] / 100, 'rgba(' + y[4 * d + 1] + ',' + y[4 * d + 2] + ',' + y[4 * d + 3] + ',' + g + ')');
          i.grd = s;
        }
        i.coOp = e.o.v * r.opacity;
      }),
      (CVShapeElement.prototype.renderStroke = function (t, e, r) {
        var i = e.style,
          s = e.d;
        s && (s._mdf || this._isFirstFrame) && ((i.da = s.dashArray), (i['do'] = s.dashoffset[0])),
          (e.c._mdf || this._isFirstFrame) && (i.co = 'rgb(' + bm_floor(e.c.v[0]) + ',' + bm_floor(e.c.v[1]) + ',' + bm_floor(e.c.v[2]) + ')'),
          (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity),
          (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v);
      }),
      (CVShapeElement.prototype.destroy = function () {
        (this.shapesData = null), (this.globalData = null), (this.canvasContext = null), (this.stylesList.length = 0), (this.itemsData.length = 0);
      }),
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement),
      (CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement),
      (CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
      (CVSolidElement.prototype.renderInnerContent = function () {
        var t = this.canvasContext;
        (t.fillStyle = this.data.sc), t.fillRect(0, 0, this.data.sw, this.data.sh);
      }),
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement),
      (CVTextElement.prototype.tHelper = createTag('canvas').getContext('2d')),
      (CVTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = !1;
        t.fc ? ((e = !0), (this.values.fill = this.buildColor(t.fc))) : (this.values.fill = 'rgba(0,0,0,0)'), (this.fill = e);
        var r = !1;
        t.sc && ((r = !0), (this.values.stroke = this.buildColor(t.sc)), (this.values.sWidth = t.sw));
        var i,
          s,
          a = this.globalData.fontManager.getFontByName(t.f),
          n = t.l,
          o = this.mHelper;
        (this.stroke = r), (this.values.fValue = t.finalSize + 'px ' + this.globalData.fontManager.getFontByName(t.f).fFamily), (s = t.finalText.length);
        var h,
          l,
          p,
          f,
          m,
          c,
          d,
          u,
          y,
          g,
          v = this.data.singleShape,
          b = (t.tr / 1e3) * t.finalSize,
          x = 0,
          E = 0,
          P = !0,
          S = 0;
        for (i = 0; i < s; i += 1) {
          for (
            h = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily),
              l = (h && h.data) || {},
              o.reset(),
              v && n[i].n && ((x = -b), (E += t.yOffset), (E += P ? 1 : 0), (P = !1)),
              m = l.shapes ? l.shapes[0].it : [],
              d = m.length,
              o.scale(t.finalSize / 100, t.finalSize / 100),
              v && this.applyTextPropertiesToMatrix(t, o, n[i].line, x, E),
              y = createSizedArray(d),
              c = 0;
            c < d;
            c += 1
          ) {
            for (f = m[c].ks.k.i.length, u = m[c].ks.k, g = [], p = 1; p < f; p += 1)
              1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)),
                g.push(
                  o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0),
                  o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0),
                  o.applyToX(u.i[p][0], u.i[p][1], 0),
                  o.applyToY(u.i[p][0], u.i[p][1], 0),
                  o.applyToX(u.v[p][0], u.v[p][1], 0),
                  o.applyToY(u.v[p][0], u.v[p][1], 0)
                );
            g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)),
              (y[c] = g);
          }
          v && ((x += n[i].l), (x += b)), this.textSpans[S] ? (this.textSpans[S].elem = y) : (this.textSpans[S] = { elem: y }), (S += 1);
        }
      }),
      (CVTextElement.prototype.renderInnerContent = function () {
        var t = this.canvasContext;
        this.finalTransform.mat.props;
        (t.font = this.values.fValue), (t.lineCap = 'butt'), (t.lineJoin = 'miter'), (t.miterLimit = 4), this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
        var e,
          r,
          i,
          s,
          a,
          n,
          o = this.textAnimator.renderedLetters,
          h = this.textProperty.currentData.l;
        r = h.length;
        var l,
          p,
          f,
          m = null,
          c = null,
          d = null;
        for (e = 0; e < r; e += 1)
          if (!h[e].n) {
            if (((l = o[e]), l && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(l.p), this.globalData.renderer.ctxOpacity(l.o)), this.fill)) {
              for (
                l && l.fc ? m !== l.fc && ((m = l.fc), (t.fillStyle = l.fc)) : m !== this.values.fill && ((m = this.values.fill), (t.fillStyle = this.values.fill)), p = this.textSpans[e].elem, s = p.length, this.globalData.canvasContext.beginPath(), i = 0;
                i < s;
                i += 1
              )
                for (f = p[i], n = f.length, this.globalData.canvasContext.moveTo(f[0], f[1]), a = 2; a < n; a += 6) this.globalData.canvasContext.bezierCurveTo(f[a], f[a + 1], f[a + 2], f[a + 3], f[a + 4], f[a + 5]);
              this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
            }
            if (this.stroke) {
              for (
                l && l.sw ? d !== l.sw && ((d = l.sw), (t.lineWidth = l.sw)) : d !== this.values.sWidth && ((d = this.values.sWidth), (t.lineWidth = this.values.sWidth)),
                  l && l.sc ? c !== l.sc && ((c = l.sc), (t.strokeStyle = l.sc)) : c !== this.values.stroke && ((c = this.values.stroke), (t.strokeStyle = this.values.stroke)),
                  p = this.textSpans[e].elem,
                  s = p.length,
                  this.globalData.canvasContext.beginPath(),
                  i = 0;
                i < s;
                i += 1
              )
                for (f = p[i], n = f.length, this.globalData.canvasContext.moveTo(f[0], f[1]), a = 2; a < n; a += 6) this.globalData.canvasContext.bezierCurveTo(f[a], f[a + 1], f[a + 2], f[a + 3], f[a + 4], f[a + 5]);
              this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
            }
            l && this.globalData.renderer.restore();
          }
      }),
      (CVEffects.prototype.renderFrame = function () {}),
      (HBaseElement.prototype = {
        checkBlendMode: function () {},
        initRendererElement: function () {
          (this.baseElement = createTag(this.data.tg || 'div')),
            this.data.hasMask
              ? ((this.svgElement = createNS('svg')), (this.layerElement = createNS('g')), (this.maskedElement = this.layerElement), this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement))
              : (this.layerElement = this.baseElement),
            styleDiv(this.baseElement);
        },
        createContainerElements: function () {
          (this.renderableEffectsManager = new CVEffects(this)),
            (this.transformedElement = this.baseElement),
            (this.maskedElement = this.layerElement),
            this.data.ln && this.layerElement.setAttribute('id', this.data.ln),
            this.data.cl && this.layerElement.setAttribute('class', this.data.cl),
            0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()),
            this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v);
        },
        renderFrame: function () {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        destroy: function () {
          (this.layerElement = null), (this.transformedElement = null), this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), (this.maskManager = null));
        },
        createRenderableComponents: function () {
          this.maskManager = new MaskElement(this.data, this, this.globalData);
        },
        addEffects: function () {},
        setMatte: function () {},
      }),
      (HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement),
      (HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy),
      (HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting),
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement),
      (HSolidElement.prototype.createContent = function () {
        var t;
        this.data.hasMask
          ? ((t = createNS('rect')), t.setAttribute('width', this.data.sw), t.setAttribute('height', this.data.sh), t.setAttribute('fill', this.data.sc), this.svgElement.setAttribute('width', this.data.sw), this.svgElement.setAttribute('height', this.data.sh))
          : ((t = createTag('div')), (t.style.width = this.data.sw + 'px'), (t.style.height = this.data.sh + 'px'), (t.style.backgroundColor = this.data.sc)),
          this.layerElement.appendChild(t);
      }),
      extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement),
      (HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements),
      (HCompElement.prototype.createContainerElements = function () {
        this._createBaseContainerElements(),
          this.data.hasMask ? (this.svgElement.setAttribute('width', this.data.w), this.svgElement.setAttribute('height', this.data.h), (this.transformedElement = this.baseElement)) : (this.transformedElement = this.layerElement);
      }),
      (HCompElement.prototype.addTo3dContainer = function (t, e) {
        for (var r, i = 0; i < e; ) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), (i += 1);
        r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t);
      }),
      extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement),
      (HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent),
      (HShapeElement.prototype.createContent = function () {
        var t;
        if (((this.baseElement.style.fontSize = 0), this.data.hasMask)) this.layerElement.appendChild(this.shapesContainer), (t = this.svgElement);
        else {
          t = createNS('svg');
          var e = this.comp.data ? this.comp.data : this.globalData.compSize;
          t.setAttribute('width', e.w), t.setAttribute('height', e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
        }
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), (this.shapeCont = t);
      }),
      (HShapeElement.prototype.getTransformedPoint = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
        return e;
      }),
      (HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
        var r,
          i,
          s,
          a,
          n,
          o = t.sh.v,
          h = t.transformers,
          l = o._length;
        if (!(l <= 1)) {
          for (r = 0; r < l - 1; r += 1) (i = this.getTransformedPoint(h, o.v[r])), (s = this.getTransformedPoint(h, o.o[r])), (a = this.getTransformedPoint(h, o.i[r + 1])), (n = this.getTransformedPoint(h, o.v[r + 1])), this.checkBounds(i, s, a, n, e);
          o.c && ((i = this.getTransformedPoint(h, o.v[r])), (s = this.getTransformedPoint(h, o.o[r])), (a = this.getTransformedPoint(h, o.i[0])), (n = this.getTransformedPoint(h, o.v[0])), this.checkBounds(i, s, a, n, e));
        }
      }),
      (HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
        this.getBoundsOfCurve(t, e, r, i);
        var a = this.shapeBoundingBox;
        (s.x = bm_min(a.left, s.x)), (s.xMax = bm_max(a.right, s.xMax)), (s.y = bm_min(a.top, s.y)), (s.yMax = bm_max(a.bottom, s.yMax));
      }),
      (HShapeElement.prototype.shapeBoundingBox = { left: 0, right: 0, top: 0, bottom: 0 }),
      (HShapeElement.prototype.tempBoundingBox = { x: 0, xMax: 0, y: 0, yMax: 0, width: 0, height: 0 }),
      (HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
        for (
          var s,
            a,
            n,
            o,
            h,
            l,
            p,
            f = [
              [t[0], i[0]],
              [t[1], i[1]],
            ],
            m = 0;
          m < 2;
          ++m
        )
          if (((a = 6 * t[m] - 12 * e[m] + 6 * r[m]), (s = -3 * t[m] + 9 * e[m] - 9 * r[m] + 3 * i[m]), (n = 3 * e[m] - 3 * t[m]), (a = 0 | a), (s = 0 | s), (n = 0 | n), 0 !== s))
            (h = a * a - 4 * n * s), h < 0 || ((l = (-a + bm_sqrt(h)) / (2 * s)), 0 < l && l < 1 && f[m].push(this.calculateF(l, t, e, r, i, m)), (p = (-a - bm_sqrt(h)) / (2 * s)), 0 < p && p < 1 && f[m].push(this.calculateF(p, t, e, r, i, m)));
          else {
            if (0 === a) continue;
            (o = -n / a), 0 < o && o < 1 && f[m].push(this.calculateF(o, t, e, r, i, m));
          }
        (this.shapeBoundingBox.left = bm_min.apply(null, f[0])), (this.shapeBoundingBox.top = bm_min.apply(null, f[1])), (this.shapeBoundingBox.right = bm_max.apply(null, f[0])), (this.shapeBoundingBox.bottom = bm_max.apply(null, f[1]));
      }),
      (HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
        return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bm_pow(t, 2) * i[a] + bm_pow(t, 3) * s[a];
      }),
      (HShapeElement.prototype.calculateBoundingBox = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e);
      }),
      (HShapeElement.prototype.currentBoxContains = function (t) {
        return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height;
      }),
      (HShapeElement.prototype.renderInnerContent = function () {
        if ((this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf))) {
          var t = this.tempBoundingBox,
            e = 999999;
          if (((t.x = e), (t.xMax = -e), (t.y = e), (t.yMax = -e), this.calculateBoundingBox(this.itemsData, t), (t.width = t.xMax < t.x ? 0 : t.xMax - t.x), (t.height = t.yMax < t.y ? 0 : t.yMax - t.y), this.currentBoxContains(t))) return;
          var r = !1;
          this.currentBBox.w !== t.width && ((this.currentBBox.w = t.width), this.shapeCont.setAttribute('width', t.width), (r = !0)),
            this.currentBBox.h !== t.height && ((this.currentBBox.h = t.height), this.shapeCont.setAttribute('height', t.height), (r = !0)),
            (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) &&
              ((this.currentBBox.w = t.width),
              (this.currentBBox.h = t.height),
              (this.currentBBox.x = t.x),
              (this.currentBBox.y = t.y),
              this.shapeCont.setAttribute('viewBox', this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h),
              (this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)'));
        }
      }),
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement),
      (HTextElement.prototype.createContent = function () {
        if (((this.isMasked = this.checkMasks()), this.isMasked)) {
          (this.renderType = 'svg'), (this.compW = this.comp.data.w), (this.compH = this.comp.data.h), this.svgElement.setAttribute('width', this.compW), this.svgElement.setAttribute('height', this.compH);
          var t = createNS('g');
          this.maskedElement.appendChild(t), (this.innerElem = t);
        } else (this.renderType = 'html'), (this.innerElem = this.layerElement);
        this.checkParenting();
      }),
      (HTextElement.prototype.buildNewText = function () {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = this.innerElem.style;
        (e.color = e.fill = t.fc ? this.buildColor(t.fc) : 'rgba(0,0,0,0)'), t.sc && ((e.stroke = this.buildColor(t.sc)), (e.strokeWidth = t.sw + 'px'));
        var r = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars)
          if (((e.fontSize = t.finalSize + 'px'), (e.lineHeight = t.finalSize + 'px'), r.fClass)) this.innerElem.className = r.fClass;
          else {
            e.fontFamily = r.fFamily;
            var i = t.fWeight,
              s = t.fStyle;
            (e.fontStyle = s), (e.fontWeight = i);
          }
        var a,
          n,
          o = t.l;
        n = o.length;
        var h,
          l,
          p,
          f,
          m = this.mHelper,
          c = '',
          d = 0;
        for (a = 0; a < n; a += 1) {
          if (
            (this.globalData.fontManager.chars
              ? (this.textPaths[d] ? (h = this.textPaths[d]) : ((h = createNS('path')), h.setAttribute('stroke-linecap', 'butt'), h.setAttribute('stroke-linejoin', 'round'), h.setAttribute('stroke-miterlimit', '4')),
                this.isMasked || (this.textSpans[d] ? ((l = this.textSpans[d]), (p = l.children[0])) : ((l = createTag('div')), (p = createNS('svg')), p.appendChild(h), styleDiv(l))))
              : this.isMasked
              ? (h = this.textPaths[d] ? this.textPaths[d] : createNS('text'))
              : this.textSpans[d]
              ? ((l = this.textSpans[d]), (h = this.textPaths[d]))
              : ((l = createTag('span')), styleDiv(l), (h = createTag('span')), styleDiv(h), l.appendChild(h)),
            this.globalData.fontManager.chars)
          ) {
            var u,
              y = this.globalData.fontManager.getCharData(t.finalText[a], r.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
            if (((u = y ? y.data : null), m.reset(), u && u.shapes && ((f = u.shapes[0].it), m.scale(t.finalSize / 100, t.finalSize / 100), (c = this.createPathShape(m, f)), h.setAttribute('d', c)), this.isMasked)) this.innerElem.appendChild(h);
            else {
              if ((this.innerElem.appendChild(l), u && u.shapes)) {
                document.body.appendChild(p);
                var g = p.getBBox();
                p.setAttribute('width', g.width + 2),
                  p.setAttribute('height', g.height + 2),
                  p.setAttribute('viewBox', g.x - 1 + ' ' + (g.y - 1) + ' ' + (g.width + 2) + ' ' + (g.height + 2)),
                  (p.style.transform = p.style.webkitTransform = 'translate(' + (g.x - 1) + 'px,' + (g.y - 1) + 'px)'),
                  (o[a].yOffset = g.y - 1);
              } else p.setAttribute('width', 1), p.setAttribute('height', 1);
              l.appendChild(p);
            }
          } else
            (h.textContent = o[a].val),
              h.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve'),
              this.isMasked ? this.innerElem.appendChild(h) : (this.innerElem.appendChild(l), (h.style.transform = h.style.webkitTransform = 'translate3d(0,' + -t.finalSize / 1.2 + 'px,0)'));
          this.isMasked ? (this.textSpans[d] = h) : (this.textSpans[d] = l), (this.textSpans[d].style.display = 'block'), (this.textPaths[d] = h), (d += 1);
        }
        for (; d < this.textSpans.length; ) (this.textSpans[d].style.display = 'none'), (d += 1);
      }),
      (HTextElement.prototype.renderInnerContent = function () {
        if (this.data.singleShape) {
          if (!this._isFirstFrame && !this.lettersChangedFlag) return;
          this.isMasked &&
            this.finalTransform._matMdf &&
            (this.svgElement.setAttribute('viewBox', -this.finalTransform.mProp.p.v[0] + ' ' + -this.finalTransform.mProp.p.v[1] + ' ' + this.compW + ' ' + this.compH),
            (this.svgElement.style.transform = this.svgElement.style.webkitTransform = 'translate(' + -this.finalTransform.mProp.p.v[0] + 'px,' + -this.finalTransform.mProp.p.v[1] + 'px)'));
        }
        if ((this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          var t,
            e,
            r = 0,
            i = this.textAnimator.renderedLetters,
            s = this.textProperty.currentData.l;
          e = s.length;
          var a, n, o;
          for (t = 0; t < e; t += 1)
            s[t].n
              ? (r += 1)
              : ((n = this.textSpans[t]),
                (o = this.textPaths[t]),
                (a = i[r]),
                (r += 1),
                a._mdf.m && (this.isMasked ? n.setAttribute('transform', a.m) : (n.style.transform = n.style.webkitTransform = a.m)),
                (n.style.opacity = a.o),
                a.sw && a._mdf.sw && o.setAttribute('stroke-width', a.sw),
                a.sc && a._mdf.sc && o.setAttribute('stroke', a.sc),
                a.fc && a._mdf.fc && (o.setAttribute('fill', a.fc), (o.style.color = a.fc)));
          if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
            var h = this.innerElem.getBBox();
            this.currentBBox.w !== h.width && ((this.currentBBox.w = h.width), this.svgElement.setAttribute('width', h.width)), this.currentBBox.h !== h.height && ((this.currentBBox.h = h.height), this.svgElement.setAttribute('height', h.height));
            var l = 1;
            (this.currentBBox.w === h.width + 2 * l && this.currentBBox.h === h.height + 2 * l && this.currentBBox.x === h.x - l && this.currentBBox.y === h.y - l) ||
              ((this.currentBBox.w = h.width + 2 * l),
              (this.currentBBox.h = h.height + 2 * l),
              (this.currentBBox.x = h.x - l),
              (this.currentBBox.y = h.y - l),
              this.svgElement.setAttribute('viewBox', this.currentBBox.x + ' ' + this.currentBBox.y + ' ' + this.currentBBox.w + ' ' + this.currentBBox.h),
              (this.svgElement.style.transform = this.svgElement.style.webkitTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)'));
          }
        }
      }),
      extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement),
      (HImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData),
          e = new Image();
        this.data.hasMask
          ? ((this.imageElem = createNS('image')),
            this.imageElem.setAttribute('width', this.assetData.w + 'px'),
            this.imageElem.setAttribute('height', this.assetData.h + 'px'),
            this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', t),
            this.layerElement.appendChild(this.imageElem),
            this.baseElement.setAttribute('width', this.assetData.w),
            this.baseElement.setAttribute('height', this.assetData.h))
          : this.layerElement.appendChild(e),
          (e.src = t),
          this.data.ln && this.baseElement.setAttribute('id', this.data.ln);
      }),
      extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement),
      (HCameraElement.prototype.setup = function () {
        var t,
          e,
          r = this.comp.threeDElements.length;
        for (t = 0; t < r; t += 1)
          (e = this.comp.threeDElements[t]),
            '3d' === e.type &&
              ((e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + 'px'),
              (e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = '0px 0px 0px'),
              (e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'));
      }),
      (HCameraElement.prototype.createElements = function () {}),
      (HCameraElement.prototype.hide = function () {}),
      (HCameraElement.prototype.renderFrame = function () {
        var t,
          e,
          r = this._isFirstFrame;
        if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
        if (r || this.pe._mdf || (this.p && this.p._mdf) || (this.px && (this.px._mdf || this.py._mdf || this.pz._mdf)) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || (this.a && this.a._mdf)) {
          if ((this.mat.reset(), this.hierarchy)) {
            for (e = this.hierarchy.length - 1, t = e; t >= 0; t -= 1) {
              var i = this.hierarchy[t].finalTransform.mProp;
              this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]),
                this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]),
                this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v),
                this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]),
                this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
            }
          }
          if ((this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a)) {
            var s = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
              a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
              n = [s[0] / a, s[1] / a, s[2] / a],
              o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
              h = Math.atan2(n[1], o),
              l = Math.atan2(n[0], -n[2]);
            this.mat.rotateY(l).rotateX(-h);
          }
          this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
            this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),
            this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0),
            this.mat.translate(0, 0, this.pe.v);
          var p = !this._prevMat.equals(this.mat);
          if ((p || this.pe._mdf) && this.comp.threeDElements) {
            e = this.comp.threeDElements.length;
            var f;
            for (t = 0; t < e; t += 1)
              (f = this.comp.threeDElements[t]),
                '3d' === f.type && (p && (f.container.style.transform = f.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (f.perspectiveElem.style.perspective = f.perspectiveElem.style.webkitPerspective = this.pe.v + 'px'));
            this.mat.clone(this._prevMat);
          }
        }
        this._isFirstFrame = !1;
      }),
      (HCameraElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }),
      (HCameraElement.prototype.destroy = function () {}),
      (HCameraElement.prototype.initExpressions = function () {}),
      (HCameraElement.prototype.getBaseElement = function () {
        return null;
      }),
      (HEffects.prototype.renderFrame = function () {});
    var Expressions = (function () {
      function t(t) {
        function e() {
          a += 1;
        }
        function r() {
          (a -= 1), 0 === a && s();
        }
        function i(t) {
          n.indexOf(t) === -1 && n.push(t);
        }
        function s() {
          var t,
            e = n.length;
          for (t = 0; t < e; t += 1) n[t].release();
          n.length = 0;
        }
        var a = 0,
          n = [];
        (t.renderer.compInterface = CompExpressionInterface(t.renderer)),
          t.renderer.globalData.projectInterface.registerComposition(t.renderer),
          (t.renderer.globalData.pushExpression = e),
          (t.renderer.globalData.popExpression = r),
          (t.renderer.globalData.registerExpressionProperty = i);
      }
      var e = {};
      return (e.initExpressions = t), e;
    })();
    expressionsPlugin = Expressions;
    var ExpressionManager = (function () {
      function $bm_isInstanceOfArray(t) {
        return t.constructor === Array || t.constructor === Float32Array;
      }
      function isNumerable(t, e) {
        return 'number' === t || 'boolean' === t || 'string' === t || e instanceof Number;
      }
      function $bm_neg(t) {
        var e = typeof t;
        if ('number' === e || 'boolean' === e || t instanceof Number) return -t;
        if ($bm_isInstanceOfArray(t)) {
          var r,
            i = t.length,
            s = [];
          for (r = 0; r < i; r += 1) s[r] = -t[r];
          return s;
        }
      }
      function sum(t, e) {
        var r = typeof t,
          i = typeof e;
        if ('string' === r || 'string' === i) return t + e;
        if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0)), (t[0] = t[0] + e), t;
        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0)), (e[0] = t + e[0]), e;
        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
          for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n; )
            ('number' == typeof t[s] || t[s] instanceof Number) && ('number' == typeof e[s] || e[s] instanceof Number) ? (o[s] = t[s] + e[s]) : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]), (s += 1);
          return o;
        }
        return 0;
      }
      function sub(t, e) {
        var r = typeof t,
          i = typeof e;
        if (isNumerable(r, t) && isNumerable(i, e)) return 'string' === r && (t = parseInt(t)), 'string' === i && (e = parseInt(e)), t - e;
        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0)), (t[0] = t[0] - e), t;
        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0)), (e[0] = t - e[0]), e;
        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
          for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n; )
            ('number' == typeof t[s] || t[s] instanceof Number) && ('number' == typeof e[s] || e[s] instanceof Number) ? (o[s] = t[s] - e[s]) : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]), (s += 1);
          return o;
        }
        return 0;
      }
      function mul(t, e) {
        var r,
          i = typeof t,
          s = typeof e;
        if (isNumerable(i, t) && isNumerable(s, e)) return t * e;
        var a, n;
        if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) {
          for (n = t.length, r = createTypedArray('float32', n), a = 0; a < n; a += 1) r[a] = t[a] * e;
          return r;
        }
        if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) {
          for (n = e.length, r = createTypedArray('float32', n), a = 0; a < n; a += 1) r[a] = t * e[a];
          return r;
        }
        return 0;
      }
      function div(t, e) {
        var r,
          i = typeof t,
          s = typeof e;
        if (isNumerable(i, t) && isNumerable(s, e)) return t / e;
        var a, n;
        if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) {
          for (n = t.length, r = createTypedArray('float32', n), a = 0; a < n; a += 1) r[a] = t[a] / e;
          return r;
        }
        if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) {
          for (n = e.length, r = createTypedArray('float32', n), a = 0; a < n; a += 1) r[a] = t / e[a];
          return r;
        }
        return 0;
      }
      function mod(t, e) {
        return 'string' == typeof t && (t = parseInt(t)), 'string' == typeof e && (e = parseInt(e)), t % e;
      }
      function clamp(t, e, r) {
        if (e > r) {
          var i = r;
          (r = e), (e = i);
        }
        return Math.min(Math.max(t, e), r);
      }
      function radiansToDegrees(t) {
        return t / degToRads;
      }
      function degreesToRadians(t) {
        return t * degToRads;
      }
      function length(t, e) {
        if ('number' == typeof t || t instanceof Number) return (e = e || 0), Math.abs(t - e);
        e || (e = helperLengthArray);
        var r,
          i = Math.min(t.length, e.length),
          s = 0;
        for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
        return Math.sqrt(s);
      }
      function normalize(t) {
        return div(t, length(t));
      }
      function rgbToHsl(t) {
        var e,
          r,
          i = t[0],
          s = t[1],
          a = t[2],
          n = Math.max(i, s, a),
          o = Math.min(i, s, a),
          h = (n + o) / 2;
        if (n == o) e = r = 0;
        else {
          var l = n - o;
          switch (((r = h > 0.5 ? l / (2 - n - o) : l / (n + o)), n)) {
            case i:
              e = (s - a) / l + (s < a ? 6 : 0);
              break;
            case s:
              e = (a - i) / l + 2;
              break;
            case a:
              e = (i - s) / l + 4;
          }
          e /= 6;
        }
        return [e, r, h, t[3]];
      }
      function hue2rgb(t, e, r) {
        return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < 0.5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
      }
      function hslToRgb(t) {
        var e,
          r,
          i,
          s = t[0],
          a = t[1],
          n = t[2];
        if (0 === a) e = r = i = n;
        else {
          var o = n < 0.5 ? n * (1 + a) : n + a - n * a,
            h = 2 * n - o;
          (e = hue2rgb(h, o, s + 1 / 3)), (r = hue2rgb(h, o, s)), (i = hue2rgb(h, o, s - 1 / 3));
        }
        return [e, r, i, t[3]];
      }
      function linear(t, e, r, i, s) {
        if (((void 0 !== i && void 0 !== s) || ((i = e), (s = r), (e = 0), (r = 1)), r < e)) {
          var a = r;
          (r = e), (e = a);
        }
        if (t <= e) return i;
        if (t >= r) return s;
        var n = r === e ? 0 : (t - e) / (r - e);
        if (!i.length) return i + (s - i) * n;
        var o,
          h = i.length,
          l = createTypedArray('float32', h);
        for (o = 0; o < h; o += 1) l[o] = i[o] + (s[o] - i[o]) * n;
        return l;
      }
      function random(t, e) {
        if ((void 0 === e && (void 0 === t ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))), e.length)) {
          var r,
            i = e.length;
          t || (t = createTypedArray('float32', i));
          var s = createTypedArray('float32', i),
            a = BMMath.random();
          for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
          return s;
        }
        void 0 === t && (t = 0);
        var n = BMMath.random();
        return t + n * (e - t);
      }
      function createPath(t, e, r, i) {
        var s,
          a = t.length,
          n = shape_pool.newElement();
        n.setPathData(!!i, a);
        var o,
          h,
          l = [0, 0];
        for (s = 0; s < a; s += 1) (o = e && e[s] ? e[s] : l), (h = r && r[s] ? r[s] : l), n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
        return n;
      }
      function initiateExpression(elem, data, property) {
        function loopInDuration(t, e) {
          return loopIn(t, e, !0);
        }
        function loopOutDuration(t, e) {
          return loopOut(t, e, !0);
        }
        function lookAt(t, e) {
          var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
            i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads,
            s = -Math.atan2(r[1], r[2]) / degToRads;
          return [s, i, 0];
        }
        function easeOut(t, e, r, i, s) {
          return applyEase(easeOutBez, t, e, r, i, s);
        }
        function easeIn(t, e, r, i, s) {
          return applyEase(easeInBez, t, e, r, i, s);
        }
        function ease(t, e, r, i, s) {
          return applyEase(easeInOutBez, t, e, r, i, s);
        }
        function applyEase(t, e, r, i, s, a) {
          void 0 === s ? ((s = r), (a = i)) : (e = (e - r) / (i - r)), (e = e > 1 ? 1 : e < 0 ? 0 : e);
          var n = t(e);
          if ($bm_isInstanceOfArray(s)) {
            var o,
              h = s.length,
              l = createTypedArray('float32', h);
            for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
            return l;
          }
          return (a - s) * n + s;
        }
        function nearestKey(t) {
          var e,
            r,
            i,
            s = data.k.length;
          if (data.k.length && 'number' != typeof data.k[0])
            if (((r = -1), (t *= elem.comp.globalData.frameRate), t < data.k[0].t)) (r = 1), (i = data.k[0].t);
            else {
              for (e = 0; e < s - 1; e += 1) {
                if (t === data.k[e].t) {
                  (r = e + 1), (i = data.k[e].t);
                  break;
                }
                if (t > data.k[e].t && t < data.k[e + 1].t) {
                  t - data.k[e].t > data.k[e + 1].t - t ? ((r = e + 2), (i = data.k[e + 1].t)) : ((r = e + 1), (i = data.k[e].t));
                  break;
                }
              }
              r === -1 && ((r = e + 1), (i = data.k[e].t));
            }
          else (r = 0), (i = 0);
          var a = {};
          return (a.index = r), (a.time = i / elem.comp.globalData.frameRate), a;
        }
        function key(t) {
          var e, r, i;
          if (!data.k.length || 'number' == typeof data.k[0]) throw new Error('The property has no keyframe at index ' + t);
          (t -= 1), (e = { time: data.k[t].t / elem.comp.globalData.frameRate });
          var s;
          for (s = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t - 1].e, i = s.length, r = 0; r < i; r += 1) e[r] = s[r];
          return e;
        }
        function framesToTime(t, e) {
          return e || (e = elem.comp.globalData.frameRate), t / e;
        }
        function timeToFrames(t, e) {
          return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
        }
        function seedRandom(t) {
          BMMath.seedrandom(randSeed + t);
        }
        function sourceRectAtTime() {
          return elem.sourceRectAtTime();
        }
        function substring(t, e) {
          return 'string' == typeof value ? (void 0 === e ? value.substring(t) : value.substring(t, e)) : '';
        }
        function substr(t, e) {
          return 'string' == typeof value ? (void 0 === e ? value.substr(t) : value.substr(t, e)) : '';
        }
        function executeExpression(t) {
          return (
            (value = t),
            _needsRandom && seedRandom(randSeed),
            this.frameExpressionId === elem.globalData.frameId && 'textSelector' !== this.propType
              ? value
              : ('textSelector' === this.propType && ((textIndex = this.textIndex), (textTotal = this.textTotal), (selectorValue = this.selectorValue)),
                thisLayer ||
                  ((text = elem.layerInterface.text),
                  (thisLayer = elem.layerInterface),
                  (thisComp = elem.comp.compInterface),
                  (toWorld = thisLayer.toWorld.bind(thisLayer)),
                  (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                  (fromComp = thisLayer.fromComp.bind(thisLayer)),
                  (toComp = thisLayer.toComp.bind(thisLayer)),
                  (mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null),
                  (fromCompToSurface = fromComp)),
                transform || ((transform = elem.layerInterface('ADBE Transform Group')), ($bm_transform = transform), transform && (anchorPoint = transform.anchorPoint)),
                4 !== elemType || content || (content = thisLayer('ADBE Root Vectors Group')),
                effect || (effect = thisLayer(4)),
                (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)),
                hasParent && !parent && (parent = elem.hierarchy[0].layerInterface),
                (time = this.comp.renderedFrame / this.comp.globalData.frameRate),
                needsVelocity && (velocity = velocityAtTime(time)),
                expression_function(),
                (this.frameExpressionId = elem.globalData.frameId),
                'shape' === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v),
                scoped_bm_rt)
          );
        }
        var val = data.x,
          needsVelocity = /velocity(?![\w\d])/.test(val),
          _needsRandom = val.indexOf('random') !== -1,
          elemType = elem.data.ty,
          transform,
          $bm_transform,
          content,
          effect,
          thisProperty = property;
        (thisProperty.valueAtTime = thisProperty.getValueAtTime), (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate), (elem.comp.displayStartTime = 0);
        var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
          outPoint = elem.data.op / elem.comp.globalData.frameRate,
          width = elem.data.sw ? elem.data.sw : 0,
          height = elem.data.sh ? elem.data.sh : 0,
          name = elem.data.nm,
          loopIn,
          loop_in,
          loopOut,
          loop_out,
          toWorld,
          fromWorld,
          fromComp,
          toComp,
          fromCompToSurface,
          position,
          rotation,
          anchorPoint,
          scale,
          thisLayer,
          thisComp,
          mask,
          valueAtTime,
          velocityAtTime,
          __expression_functions = [];
        if (data.xf) {
          var i,
            len = data.xf.length;
          for (i = 0; i < len; i += 1) __expression_functions[i] = eval('(function(){ return ' + data.xf[i] + '}())');
        }
        var scoped_bm_rt,
          expression_function = eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0],
          numKeys = property.kf ? data.k.length : 0,
          active = !this.data || this.data.hd !== !0,
          wiggle = function (t, e) {
            var r,
              i,
              s = this.pv.length ? this.pv.length : 1,
              a = createTypedArray('float32', s);
            t = 5;
            var n = Math.floor(time * t);
            for (r = 0, i = 0; r < n; ) {
              for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
              r += 1;
            }
            var o = time * t,
              h = o - Math.floor(o),
              l = createTypedArray('float32', s);
            if (s > 1) {
              for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
              return l;
            }
            return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
          }.bind(this);
        thisProperty.loopIn && ((loopIn = thisProperty.loopIn.bind(thisProperty)), (loop_in = loopIn)),
          thisProperty.loopOut && ((loopOut = thisProperty.loopOut.bind(thisProperty)), (loop_out = loopOut)),
          this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
          this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
        var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
          time,
          velocity,
          value,
          text,
          textIndex,
          textTotal,
          selectorValue,
          index = elem.data.ind,
          hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
          parent,
          randSeed = Math.floor(1e6 * Math.random()),
          globalData = elem.globalData;
        return executeExpression;
      }
      var ob = {},
        Math = BMMath,
        window = null,
        document = null,
        easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, 'easeIn').get,
        easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, 'easeOut').get,
        easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, 'easeInOut').get,
        add = sum,
        radians_to_degrees = radiansToDegrees,
        degrees_to_radians = radiansToDegrees,
        helperLengthArray = [0, 0, 0, 0, 0, 0];
      return (ob.initiateExpression = initiateExpression), ob;
    })();
    !(function () {
      function t() {
        return this.pv;
      }
      function e(t, e, r) {
        if (!this.k || !this.keyframes) return this.pv;
        t = t ? t.toLowerCase() : '';
        var i = this.comp.renderedFrame,
          s = this.keyframes,
          a = s[s.length - 1].t;
        if (i <= a) return this.pv;
        var n, o;
        r ? ((n = e ? Math.abs(a - elem.comp.globalData.frameRate * e) : Math.max(0, a - this.elem.data.ip)), (o = a - n)) : ((!e || e > s.length - 1) && (e = s.length - 1), (o = s[s.length - 1 - e].t), (n = a - o));
        var h, l, p;
        if ('pingpong' === t) {
          var f = Math.floor((i - o) / n);
          if (f % 2 !== 0) return this.getValueAtTime((n - ((i - o) % n) + o) / this.comp.globalData.frameRate, 0);
        } else {
          if ('offset' === t) {
            var m = this.getValueAtTime(o / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              d = this.getValueAtTime((((i - o) % n) + o) / this.comp.globalData.frameRate, 0),
              u = Math.floor((i - o) / n);
            if (this.pv.length) {
              for (p = new Array(m.length), l = p.length, h = 0; h < l; h += 1) p[h] = (c[h] - m[h]) * u + d[h];
              return p;
            }
            return (c - m) * u + d;
          }
          if ('continue' === t) {
            var y = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              g = this.getValueAtTime((a - 0.001) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (p = new Array(y.length), l = p.length, h = 0; h < l; h += 1) p[h] = y[h] + ((y[h] - g[h]) * ((i - a) / this.comp.globalData.frameRate)) / 5e-4;
              return p;
            }
            return y + (y - g) * ((i - a) / 0.001);
          }
        }
        return this.getValueAtTime((((i - o) % n) + o) / this.comp.globalData.frameRate, 0);
      }
      function r(t, e, r) {
        if (!this.k) return this.pv;
        t = t ? t.toLowerCase() : '';
        var i = this.comp.renderedFrame,
          s = this.keyframes,
          a = s[0].t;
        if (i >= a) return this.pv;
        var n, o;
        r ? ((n = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - a)), (o = a + n)) : ((!e || e > s.length - 1) && (e = s.length - 1), (o = s[e].t), (n = o - a));
        var h, l, p;
        if ('pingpong' === t) {
          var f = Math.floor((a - i) / n);
          if (f % 2 === 0) return this.getValueAtTime((((a - i) % n) + a) / this.comp.globalData.frameRate, 0);
        } else {
          if ('offset' === t) {
            var m = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(o / this.comp.globalData.frameRate, 0),
              d = this.getValueAtTime((n - ((a - i) % n) + a) / this.comp.globalData.frameRate, 0),
              u = Math.floor((a - i) / n) + 1;
            if (this.pv.length) {
              for (p = new Array(m.length), l = p.length, h = 0; h < l; h += 1) p[h] = d[h] - (c[h] - m[h]) * u;
              return p;
            }
            return d - (c - m) * u;
          }
          if ('continue' === t) {
            var y = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              g = this.getValueAtTime((a + 0.001) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (p = new Array(y.length), l = p.length, h = 0; h < l; h += 1) p[h] = y[h] + ((y[h] - g[h]) * (a - i)) / 0.001;
              return p;
            }
            return y + ((y - g) * (a - i)) / 0.001;
          }
        }
        return this.getValueAtTime((n - ((a - i) % n) + a) / this.comp.globalData.frameRate, 0);
      }
      function i(t) {
        return (
          (t *= this.elem.globalData.frameRate),
          (t -= this.offsetTime),
          t !== this._cachingAtTime.lastFrame &&
            ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0), (this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime)), (this._cachingAtTime.lastFrame = t)),
          this._cachingAtTime.value
        );
      }
      function s(t) {
        var e = -0.01,
          r = this.getValueAtTime(t),
          i = this.getValueAtTime(t + e),
          s = 0;
        if (r.length) {
          var a;
          for (a = 0; a < r.length; a += 1) s += Math.pow(i[a] - r[a], 2);
          s = 100 * Math.sqrt(s);
        } else s = 0;
        return s;
      }
      function a(t) {
        if (void 0 !== this.vel) return this.vel;
        var e,
          r = -0.001,
          i = this.getValueAtTime(t),
          s = this.getValueAtTime(t + r);
        if (i.length) {
          e = createTypedArray('float32', i.length);
          var a;
          for (a = 0; a < i.length; a += 1) e[a] = (s[a] - i[a]) / r;
        } else e = (s - i) / r;
        return e;
      }
      function n(t) {
        this.propertyGroup = t;
      }
      function o(t, e, r) {
        e.x && ((r.k = !0), (r.x = !0), (r.initiateExpression = ExpressionManager.initiateExpression), r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
      }
      function h(t) {
        console.warn('Transform at time not supported');
      }
      function l(t) {}
      function p(t) {
        return (
          this._cachingAtTime || (this._cachingAtTime = { shapeValue: shape_pool.clone(this.pv), lastIndex: 0, lastTime: initialDefaultFrame }),
          t !== this._cachingAtTime.lastTime &&
            ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0),
            (this._cachingAtTime.lastTime = t),
            (t *= this.elem.globalData.frameRate),
            this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)),
          this._cachingAtTime.shapeValue
        );
      }
      function f() {}
      var m = (function () {
          function e(t, e) {
            return (this.textIndex = t + 1), (this.textTotal = e), this.getValue(), this.v;
          }
          return function (r, s) {
            (this.pv = 1),
              (this.comp = r.comp),
              (this.elem = r),
              (this.mult = 0.01),
              (this.propType = 'textSelector'),
              (this.textTotal = s.totalChars),
              (this.selectorValue = 100),
              (this.lastValue = [1, 1, 1]),
              o.bind(this)(r, s, this),
              (this.getMult = e),
              (this.getVelocityAtTime = a),
              this.kf ? (this.getValueAtTime = i.bind(this)) : (this.getValueAtTime = t.bind(this)),
              (this.setGroupProperty = n);
          };
        })(),
        c = TransformPropertyFactory.getTransformProperty;
      TransformPropertyFactory.getTransformProperty = function (t, e, r) {
        var i = c(t, e, r);
        return i.dynamicProperties.length ? (i.getValueAtTime = h.bind(i)) : (i.getValueAtTime = l.bind(i)), (i.setGroupProperty = n), i;
      };
      var d = PropertyFactory.getProp;
      PropertyFactory.getProp = function (h, l, p, f, m) {
        var c = d(h, l, p, f, m);
        c.kf ? (c.getValueAtTime = i.bind(c)) : (c.getValueAtTime = t.bind(c)),
          (c.setGroupProperty = n),
          (c.loopOut = e),
          (c.loopIn = r),
          (c.getVelocityAtTime = a.bind(c)),
          (c.getSpeedAtTime = s.bind(c)),
          (c.numKeys = 1 === l.a ? l.k.length : 0),
          (c.propertyIndex = l.ix);
        var u = 0;
        return 0 !== p && (u = createTypedArray('float32', 1 === l.a ? l.k[0].s.length : l.k.length)), (c._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: u }), o(h, l, c), c.k && m.addDynamicProperty(c), c;
      };
      var u = ShapePropertyFactory.getConstructorFunction(),
        y = ShapePropertyFactory.getKeyframedConstructorFunction();
      (f.prototype = {
        vertices: function (t, e) {
          this.k && this.getValue();
          var r = this.v;
          void 0 !== e && (r = this.getValueAtTime(e, 0));
          var i,
            s = r._length,
            a = r[t],
            n = r.v,
            o = createSizedArray(s);
          for (i = 0; i < s; i += 1) 'i' === t || 'o' === t ? (o[i] = [a[i][0] - n[i][0], a[i][1] - n[i][1]]) : (o[i] = [a[i][0], a[i][1]]);
          return o;
        },
        points: function (t) {
          return this.vertices('v', t);
        },
        inTangents: function (t) {
          return this.vertices('i', t);
        },
        outTangents: function (t) {
          return this.vertices('o', t);
        },
        isClosed: function () {
          return this.v.c;
        },
        pointOnPath: function (t, e) {
          var r = this.v;
          void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
          for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h; ) {
            if (l + a[o].addedLength > n) {
              var p = o,
                f = r.c && o === h - 1 ? 0 : o + 1,
                m = (n - l) / a[o].addedLength;
              i = bez.getPointInSegment(r.v[p], r.v[f], r.o[p], r.i[f], m, a[o]);
              break;
            }
            (l += a[o].addedLength), (o += 1);
          }
          return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i;
        },
        vectorOnPath: function (t, e, r) {
          t = 1 == t ? (this.v.c ? 0 : 0.999) : t;
          var i = this.pointOnPath(t, e),
            s = this.pointOnPath(t + 0.001, e),
            a = s[0] - i[0],
            n = s[1] - i[1],
            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2)),
            h = 'tangent' === r ? [a / o, n / o] : [-n / o, a / o];
          return h;
        },
        tangentOnPath: function (t, e) {
          return this.vectorOnPath(t, e, 'tangent');
        },
        normalOnPath: function (t, e) {
          return this.vectorOnPath(t, e, 'normal');
        },
        setGroupProperty: n,
        getValueAtTime: t,
      }),
        extendPrototype([f], u),
        extendPrototype([f], y),
        (y.prototype.getValueAtTime = p),
        (y.prototype.initiateExpression = ExpressionManager.initiateExpression);
      var g = ShapePropertyFactory.getShapeProp;
      ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
        var a = g(t, e, r, i, s);
        return (a.propertyIndex = e.ix), (a.lock = !1), 3 === r ? o(t, e.pt, a) : 4 === r && o(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
      };
      var v = TextSelectorProp.getTextSelectorProp;
      TextSelectorProp.getTextSelectorProp = function (t, e, r) {
        return 1 === e.t ? new m(t, e, r) : v(t, e, r);
      };
    })(),
      (function () {
        function t() {
          if (this.data.d.x) return (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this)), this.addEffect(this.getExpressionValue.bind(this)), !0;
        }
        (TextProperty.prototype.getExpressionValue = function (t, e) {
          var r = this.calculateExpression(e);
          if (t.t !== r) {
            var i = {};
            return this.copyData(i, t), (i.t = r.toString()), (i.__complete = !1), i;
          }
          return t;
        }),
          (TextProperty.prototype.searchProperty = function () {
            var t = this.searchKeyframes(),
              e = this.searchExpressions();
            return (this.kf = t || e), this.kf;
          }),
          (TextProperty.prototype.searchExpressions = t);
      })();
    var ShapeExpressionInterface = (function () {
        function t(t, e, n) {
          var c,
            d = [],
            u = t ? t.length : 0;
          for (c = 0; c < u; c += 1)
            'gr' == t[c].ty
              ? d.push(r(t[c], e[c], n))
              : 'fl' == t[c].ty
              ? d.push(i(t[c], e[c], n))
              : 'st' == t[c].ty
              ? d.push(s(t[c], e[c], n))
              : 'tm' == t[c].ty
              ? d.push(a(t[c], e[c], n))
              : 'tr' == t[c].ty ||
                ('el' == t[c].ty
                  ? d.push(o(t[c], e[c], n))
                  : 'sr' == t[c].ty
                  ? d.push(h(t[c], e[c], n))
                  : 'sh' == t[c].ty
                  ? d.push(m(t[c], e[c], n))
                  : 'rc' == t[c].ty
                  ? d.push(l(t[c], e[c], n))
                  : 'rd' == t[c].ty
                  ? d.push(p(t[c], e[c], n))
                  : 'rp' == t[c].ty && d.push(f(t[c], e[c], n)));
          return d;
        }
        function e(e, r, i) {
          var s,
            a = function (t) {
              for (var e = 0, r = s.length; e < r; ) {
                if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                e += 1;
              }
              if ('number' == typeof t) return s[t - 1];
            };
          return (
            (a.propertyGroup = function (t) {
              return 1 === t ? a : i(t - 1);
            }),
            (s = t(e.it, r.it, a.propertyGroup)),
            (a.numProperties = s.length),
            (a.propertyIndex = e.cix),
            (a._name = e.nm),
            a
          );
        }
        function r(t, r, i) {
          var s = function (t) {
            switch (t) {
              case 'ADBE Vectors Group':
              case 'Contents':
              case 2:
                return s.content;
              default:
                return s.transform;
            }
          };
          s.propertyGroup = function (t) {
            return 1 === t ? s : i(t - 1);
          };
          var a = e(t, r, s.propertyGroup),
            o = n(t.it[t.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);
          return (
            (s.content = a),
            (s.transform = o),
            Object.defineProperty(s, '_name', {
              get: function () {
                return t.nm;
              },
            }),
            (s.numProperties = t.np),
            (s.propertyIndex = t.ix),
            (s.nm = t.nm),
            (s.mn = t.mn),
            s
          );
        }
        function i(t, e, r) {
          function i(t) {
            return 'Color' === t || 'color' === t ? i.color : 'Opacity' === t || 'opacity' === t ? i.opacity : void 0;
          }
          return Object.defineProperties(i, { color: { get: ExpressionPropertyInterface(e.c) }, opacity: { get: ExpressionPropertyInterface(e.o) }, _name: { value: t.nm }, mn: { value: t.mn } }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i;
        }
        function s(t, e, r) {
          function i(t) {
            return 1 === t ? ob : r(t - 1);
          }
          function s(t) {
            return 1 === t ? l : i(t - 1);
          }
          function a(r) {
            Object.defineProperty(l, t.d[r].nm, { get: ExpressionPropertyInterface(e.d.dataProps[r].p) });
          }
          function n(t) {
            return 'Color' === t || 'color' === t ? n.color : 'Opacity' === t || 'opacity' === t ? n.opacity : 'Stroke Width' === t || 'stroke width' === t ? n.strokeWidth : void 0;
          }
          var o,
            h = t.d ? t.d.length : 0,
            l = {};
          for (o = 0; o < h; o += 1) a(o), e.d.dataProps[o].p.setGroupProperty(s);
          return (
            Object.defineProperties(n, {
              color: { get: ExpressionPropertyInterface(e.c) },
              opacity: { get: ExpressionPropertyInterface(e.o) },
              strokeWidth: { get: ExpressionPropertyInterface(e.w) },
              dash: {
                get: function () {
                  return l;
                },
              },
              _name: { value: t.nm },
              mn: { value: t.mn },
            }),
            e.c.setGroupProperty(i),
            e.o.setGroupProperty(i),
            e.w.setGroupProperty(i),
            n
          );
        }
        function a(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return e === t.e.ix || 'End' === e || 'end' === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0;
          }
          return (
            (s.propertyIndex = t.ix),
            e.s.setGroupProperty(i),
            e.e.setGroupProperty(i),
            e.o.setGroupProperty(i),
            (s.propertyIndex = t.ix),
            Object.defineProperties(s, { start: { get: ExpressionPropertyInterface(e.s) }, end: { get: ExpressionPropertyInterface(e.e) }, offset: { get: ExpressionPropertyInterface(e.o) }, _name: { value: t.nm } }),
            (s.mn = t.mn),
            s
          );
        }
        function n(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return t.a.ix === e || 'Anchor Point' === e
              ? s.anchorPoint
              : t.o.ix === e || 'Opacity' === e
              ? s.opacity
              : t.p.ix === e || 'Position' === e
              ? s.position
              : t.r.ix === e || 'Rotation' === e || 'ADBE Vector Rotation' === e
              ? s.rotation
              : t.s.ix === e || 'Scale' === e
              ? s.scale
              : (t.sk && t.sk.ix === e) || 'Skew' === e
              ? s.skew
              : (t.sa && t.sa.ix === e) || 'Skew Axis' === e
              ? s.skewAxis
              : void 0;
          }
          return (
            e.transform.mProps.o.setGroupProperty(i),
            e.transform.mProps.p.setGroupProperty(i),
            e.transform.mProps.a.setGroupProperty(i),
            e.transform.mProps.s.setGroupProperty(i),
            e.transform.mProps.r.setGroupProperty(i),
            e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i)),
            e.transform.op.setGroupProperty(i),
            Object.defineProperties(s, {
              opacity: { get: ExpressionPropertyInterface(e.transform.mProps.o) },
              position: { get: ExpressionPropertyInterface(e.transform.mProps.p) },
              anchorPoint: { get: ExpressionPropertyInterface(e.transform.mProps.a) },
              scale: { get: ExpressionPropertyInterface(e.transform.mProps.s) },
              rotation: { get: ExpressionPropertyInterface(e.transform.mProps.r) },
              skew: { get: ExpressionPropertyInterface(e.transform.mProps.sk) },
              skewAxis: { get: ExpressionPropertyInterface(e.transform.mProps.sa) },
              _name: { value: t.nm },
            }),
            (s.ty = 'tr'),
            (s.mn = t.mn),
            s
          );
        }
        function o(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return t.p.ix === e ? s.position : t.s.ix === e ? s.size : void 0;
          }
          s.propertyIndex = t.ix;
          var a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
          return a.s.setGroupProperty(i), a.p.setGroupProperty(i), Object.defineProperties(s, { size: { get: ExpressionPropertyInterface(a.s) }, position: { get: ExpressionPropertyInterface(a.p) }, _name: { value: t.nm } }), (s.mn = t.mn), s;
        }
        function h(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return t.p.ix === e
              ? s.position
              : t.r.ix === e
              ? s.rotation
              : t.pt.ix === e
              ? s.points
              : t.or.ix === e || 'ADBE Vector Star Outer Radius' === e
              ? s.outerRadius
              : t.os.ix === e
              ? s.outerRoundness
              : !t.ir || (t.ir.ix !== e && 'ADBE Vector Star Inner Radius' !== e)
              ? t.is && t.is.ix === e
                ? s.innerRoundness
                : void 0
              : s.innerRadius;
          }
          var a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
          return (
            (s.propertyIndex = t.ix),
            a.or.setGroupProperty(i),
            a.os.setGroupProperty(i),
            a.pt.setGroupProperty(i),
            a.p.setGroupProperty(i),
            a.r.setGroupProperty(i),
            t.ir && (a.ir.setGroupProperty(i), a.is.setGroupProperty(i)),
            Object.defineProperties(s, {
              position: { get: ExpressionPropertyInterface(a.p) },
              rotation: { get: ExpressionPropertyInterface(a.r) },
              points: { get: ExpressionPropertyInterface(a.pt) },
              outerRadius: { get: ExpressionPropertyInterface(a.or) },
              outerRoundness: { get: ExpressionPropertyInterface(a.os) },
              innerRadius: { get: ExpressionPropertyInterface(a.ir) },
              innerRoundness: { get: ExpressionPropertyInterface(a.is) },
              _name: { value: t.nm },
            }),
            (s.mn = t.mn),
            s
          );
        }
        function l(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return t.p.ix === e ? s.position : t.r.ix === e ? s.roundness : t.s.ix === e || 'Size' === e || 'ADBE Vector Rect Size' === e ? s.size : void 0;
          }
          var a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
          return (
            (s.propertyIndex = t.ix),
            a.p.setGroupProperty(i),
            a.s.setGroupProperty(i),
            a.r.setGroupProperty(i),
            Object.defineProperties(s, { position: { get: ExpressionPropertyInterface(a.p) }, roundness: { get: ExpressionPropertyInterface(a.r) }, size: { get: ExpressionPropertyInterface(a.s) }, _name: { value: t.nm } }),
            (s.mn = t.mn),
            s
          );
        }
        function p(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            if (t.r.ix === e || 'Round Corners 1' === e) return s.radius;
          }
          var a = e;
          return (s.propertyIndex = t.ix), a.rd.setGroupProperty(i), Object.defineProperties(s, { radius: { get: ExpressionPropertyInterface(a.rd) }, _name: { value: t.nm } }), (s.mn = t.mn), s;
        }
        function f(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(e) {
            return t.c.ix === e || 'Copies' === e ? s.copies : t.o.ix === e || 'Offset' === e ? s.offset : void 0;
          }
          var a = e;
          return (
            (s.propertyIndex = t.ix),
            a.c.setGroupProperty(i),
            a.o.setGroupProperty(i),
            Object.defineProperties(s, { copies: { get: ExpressionPropertyInterface(a.c) }, offset: { get: ExpressionPropertyInterface(a.o) }, _name: { value: t.nm } }),
            (s.mn = t.mn),
            s
          );
        }
        function m(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(t) {
            if ('Shape' === t || 'shape' === t || 'Path' === t || 'path' === t || 'ADBE Vector Shape' === t || 2 === t) return s.path;
          }
          var a = e.sh;
          return (
            a.setGroupProperty(i),
            Object.defineProperties(s, {
              path: {
                get: function () {
                  return a.k && a.getValue(), a;
                },
              },
              shape: {
                get: function () {
                  return a.k && a.getValue(), a;
                },
              },
              _name: { value: t.nm },
              ix: { value: t.ix },
              mn: { value: t.mn },
            }),
            s
          );
        }
        return function (e, r, i) {
          function s(t) {
            if ('number' == typeof t) return a[t - 1];
            for (var e = 0, r = a.length; e < r; ) {
              if (a[e]._name === t) return a[e];
              e += 1;
            }
          }
          var a;
          return (s.propertyGroup = i), (a = t(e, r, s)), s;
        };
      })(),
      TextExpressionInterface = (function () {
        return function (t) {
          function e() {}
          var r, i;
          return (
            Object.defineProperty(e, 'sourceText', {
              get: function () {
                var e = t.textProperty.currentData.t;
                return e !== r && ((t.textProperty.currentData.t = r), (i = new String(e)), (i.value = e ? e : new String(e))), i;
              },
            }),
            e
          );
        };
      })(),
      LayerExpressionInterface = (function () {
        function t(t, e) {
          var r = new Matrix();
          r.reset();
          var i;
          if (((i = e ? this._elem.finalTransform.mProp : this._elem.finalTransform.mProp), i.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length)) {
            var s,
              a = this._elem.hierarchy.length;
            for (s = 0; s < a; s += 1) this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(r);
            return r.applyToPointArray(t[0], t[1], t[2] || 0);
          }
          return r.applyToPointArray(t[0], t[1], t[2] || 0);
        }
        function e(t, e) {
          var r = new Matrix();
          r.reset();
          var i;
          if (((i = e ? this._elem.finalTransform.mProp : this._elem.finalTransform.mProp), i.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length)) {
            var s,
              a = this._elem.hierarchy.length;
            for (s = 0; s < a; s += 1) this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(r);
            return r.inversePoint(t);
          }
          return r.inversePoint(t);
        }
        function r(t) {
          var e = new Matrix();
          if ((e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length)) {
            var r,
              i = this._elem.hierarchy.length;
            for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
            return e.inversePoint(t);
          }
          return e.inversePoint(t);
        }
        function i() {
          return [1, 1, 1, 1];
        }
        return function (s) {
          function a(t) {
            o.mask = new MaskManagerInterface(t, s);
          }
          function n(t) {
            o.effect = t;
          }
          function o(t) {
            switch (t) {
              case 'ADBE Root Vectors Group':
              case 'Contents':
              case 2:
                return o.shapeInterface;
              case 1:
              case 6:
              case 'Transform':
              case 'transform':
              case 'ADBE Transform Group':
                return h;
              case 4:
              case 'ADBE Effect Parade':
              case 'effects':
              case 'Effects':
                return o.effect;
            }
          }
          var h;
          (o.toWorld = t), (o.fromWorld = e), (o.toComp = t), (o.fromComp = r), (o.sampleImage = i), (o.sourceRectAtTime = s.sourceRectAtTime.bind(s)), (o._elem = s), (h = TransformExpressionInterface(s.finalTransform.mProp));
          var l = getDescriptor(h, 'anchorPoint');
          return (
            Object.defineProperties(o, {
              hasParent: {
                get: function () {
                  return s.hierarchy.length;
                },
              },
              parent: {
                get: function () {
                  return s.hierarchy[0].layerInterface;
                },
              },
              rotation: getDescriptor(h, 'rotation'),
              scale: getDescriptor(h, 'scale'),
              position: getDescriptor(h, 'position'),
              opacity: getDescriptor(h, 'opacity'),
              anchorPoint: l,
              anchor_point: l,
              transform: {
                get: function () {
                  return h;
                },
              },
              active: {
                get: function () {
                  return s.isInRange;
                },
              },
            }),
            (o.startTime = s.data.st),
            (o.index = s.data.ind),
            (o.source = s.data.refId),
            (o.height = 0 === s.data.ty ? s.data.h : 100),
            (o.width = 0 === s.data.ty ? s.data.w : 100),
            (o.inPoint = s.data.ip / s.comp.globalData.frameRate),
            (o.outPoint = s.data.op / s.comp.globalData.frameRate),
            (o._name = s.data.nm),
            (o.registerMaskInterface = a),
            (o.registerEffectsInterface = n),
            o
          );
        };
      })(),
      CompExpressionInterface = (function () {
        return function (t) {
          function e(e) {
            for (var r = 0, i = t.layers.length; r < i; ) {
              if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
              r += 1;
            }
            return null;
          }
          return (
            Object.defineProperty(e, '_name', { value: t.data.nm }),
            (e.layer = e),
            (e.pixelAspect = 1),
            (e.height = t.data.h || t.globalData.compSize.h),
            (e.width = t.data.w || t.globalData.compSize.w),
            (e.pixelAspect = 1),
            (e.frameDuration = 1 / t.globalData.frameRate),
            (e.displayStartTime = 0),
            (e.numLayers = t.layers.length),
            e
          );
        };
      })(),
      TransformExpressionInterface = (function () {
        return function (t) {
          function e(t) {
            switch (t) {
              case 'scale':
              case 'Scale':
              case 'ADBE Scale':
              case 6:
                return e.scale;
              case 'rotation':
              case 'Rotation':
              case 'ADBE Rotation':
              case 'ADBE Rotate Z':
              case 10:
                return e.rotation;
              case 'ADBE Rotate X':
                return e.xRotation;
              case 'ADBE Rotate Y':
                return e.yRotation;
              case 'position':
              case 'Position':
              case 'ADBE Position':
              case 2:
                return e.position;
              case 'ADBE Position_0':
                return e.xPosition;
              case 'ADBE Position_1':
                return e.yPosition;
              case 'ADBE Position_2':
                return e.zPosition;
              case 'anchorPoint':
              case 'AnchorPoint':
              case 'Anchor Point':
              case 'ADBE AnchorPoint':
              case 1:
                return e.anchorPoint;
              case 'opacity':
              case 'Opacity':
              case 11:
                return e.opacity;
            }
          }
          if (
            (Object.defineProperty(e, 'rotation', { get: ExpressionPropertyInterface(t.r || t.rz) }),
            Object.defineProperty(e, 'zRotation', { get: ExpressionPropertyInterface(t.rz || t.r) }),
            Object.defineProperty(e, 'xRotation', { get: ExpressionPropertyInterface(t.rx) }),
            Object.defineProperty(e, 'yRotation', { get: ExpressionPropertyInterface(t.ry) }),
            Object.defineProperty(e, 'scale', { get: ExpressionPropertyInterface(t.s) }),
            t.p)
          )
            var r = ExpressionPropertyInterface(t.p);
          return (
            Object.defineProperty(e, 'position', {
              get: function () {
                return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
              },
            }),
            Object.defineProperty(e, 'xPosition', { get: ExpressionPropertyInterface(t.px) }),
            Object.defineProperty(e, 'yPosition', { get: ExpressionPropertyInterface(t.py) }),
            Object.defineProperty(e, 'zPosition', { get: ExpressionPropertyInterface(t.pz) }),
            Object.defineProperty(e, 'anchorPoint', { get: ExpressionPropertyInterface(t.a) }),
            Object.defineProperty(e, 'opacity', { get: ExpressionPropertyInterface(t.o) }),
            Object.defineProperty(e, 'skew', { get: ExpressionPropertyInterface(t.sk) }),
            Object.defineProperty(e, 'skewAxis', { get: ExpressionPropertyInterface(t.sa) }),
            Object.defineProperty(e, 'orientation', { get: ExpressionPropertyInterface(t.or) }),
            e
          );
        };
      })(),
      ProjectInterface = (function () {
        function t(t) {
          this.compositions.push(t);
        }
        return function () {
          function e(t) {
            for (var e = 0, r = this.compositions.length; e < r; ) {
              if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
              e += 1;
            }
          }
          return (e.compositions = []), (e.currentFrame = 0), (e.registerComposition = t), e;
        };
      })(),
      EffectsExpressionInterface = (function () {
        function t(t, r) {
          if (t.effectsManager) {
            var i,
              s = [],
              a = t.data.ef,
              n = t.effectsManager.effectElements.length;
            for (i = 0; i < n; i += 1) s.push(e(a[i], t.effectsManager.effectElements[i], r, t));
            return function (e) {
              for (var r = t.data.ef || [], i = 0, a = r.length; i < a; ) {
                if (e === r[i].nm || e === r[i].mn || e === r[i].ix) return s[i];
                i += 1;
              }
            };
          }
        }
        function e(t, i, s, a) {
          function n(t) {
            return 1 === t ? p : s(t - 1);
          }
          var o,
            h = [],
            l = t.ef.length;
          for (o = 0; o < l; o += 1) 5 === t.ef[o].ty ? h.push(e(t.ef[o], i.effectElements[o], i.effectElements[o].propertyGroup, a)) : h.push(r(i.effectElements[o], t.ef[o].ty, a, n));
          var p = function (e) {
            for (var r = t.ef, i = 0, s = r.length; i < s; ) {
              if (e === r[i].nm || e === r[i].mn || e === r[i].ix) return 5 === r[i].ty ? h[i] : h[i]();
              i += 1;
            }
            return h[0]();
          };
          return (
            (p.propertyGroup = n),
            'ADBE Color Control' === t.mn &&
              Object.defineProperty(p, 'color', {
                get: function () {
                  return h[0]();
                },
              }),
            Object.defineProperty(p, 'numProperties', {
              get: function () {
                return t.np;
              },
            }),
            (p.active = p.enabled = 0 !== t.en),
            p
          );
        }
        function r(t, e, r, i) {
          function s() {
            return 10 === e ? r.comp.compInterface(t.p.v) : a();
          }
          var a = ExpressionPropertyInterface(t.p);
          return t.p.setGroupProperty && t.p.setGroupProperty(i), s;
        }
        var i = { createEffectsInterface: t };
        return i;
      })(),
      MaskManagerInterface = (function () {
        function t(t, e) {
          (this._mask = t), (this._data = e);
        }
        Object.defineProperty(t.prototype, 'maskPath', {
          get: function () {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          },
        });
        var e = function (e, r) {
          var i,
            s = createSizedArray(e.viewData.length),
            a = e.viewData.length;
          for (i = 0; i < a; i += 1) s[i] = new t(e.viewData[i], e.masksProperties[i]);
          var n = function (t) {
            for (i = 0; i < a; ) {
              if (e.masksProperties[i].nm === t) return s[i];
              i += 1;
            }
          };
          return n;
        };
        return e;
      })(),
      ExpressionPropertyInterface = (function () {
        function t(t, e) {
          Object.defineProperty(t, 'velocity', {
            get: function () {
              return e.getVelocityAtTime(e.comp.currentFrame);
            },
          }),
            (t.numKeys = e.keyframes ? e.keyframes.length : 0),
            (t.key = function (r) {
              return t.numKeys ? e.keyframes[r - 1].t : 0;
            }),
            (t.valueAtTime = e.getValueAtTime),
            (t.speedAtTime = e.getSpeedAtTime),
            (t.velocityAtTime = e.getVelocityAtTime),
            (t.propertyGroup = e.propertyGroup);
        }
        function e(e) {
          (e && 'pv' in e) || (e = s);
          var r = 1 / e.mult,
            i = e.pv * r,
            a = new Number(i);
          return (
            (a.value = i),
            t(a, e),
            function () {
              return e.k && e.getValue(), (i = e.v * r), a.value !== i && ((a = new Number(i)), (a.value = i), t(a, e)), a;
            }
          );
        }
        function r(e) {
          (e && 'pv' in e) || (e = a);
          var r = 1 / e.mult,
            i = e.pv.length,
            s = createTypedArray('float32', i),
            n = createTypedArray('float32', i);
          return (
            (s.value = n),
            t(s, e),
            function () {
              e.k && e.getValue();
              for (var t = 0; t < i; t += 1) s[t] = n[t] = e.v[t] * r;
              return s;
            }
          );
        }
        function i() {
          return s;
        }
        var s = { pv: 0, v: 0, mult: 1 },
          a = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
        return function (t) {
          return t ? ('unidimensional' === t.propType ? e(t) : r(t)) : i;
        };
      })();
    extendPrototype([DynamicPropertyContainer], GroupEffect),
      (GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties),
      (GroupEffect.prototype.init = function (t, e) {
        (this.data = t), (this.effectElements = []), this.initDynamicPropertyContainer(e);
        var r,
          i,
          s = this.data.ef.length,
          a = this.data.ef;
        for (r = 0; r < s; r += 1) {
          switch (((i = null), a[r].ty)) {
            case 0:
              i = new SliderEffect(a[r], e, this);
              break;
            case 1:
              i = new AngleEffect(a[r], e, this);
              break;
            case 2:
              i = new ColorEffect(a[r], e, this);
              break;
            case 3:
              i = new PointEffect(a[r], e, this);
              break;
            case 4:
            case 7:
              i = new CheckboxEffect(a[r], e, this);
              break;
            case 10:
              i = new LayerIndexEffect(a[r], e, this);
              break;
            case 11:
              i = new MaskIndexEffect(a[r], e, this);
              break;
            case 5:
              i = new EffectsManager(a[r], e, this);
              break;
            default:
              i = new NoValueEffect(a[r], e, this);
          }
          i && this.effectElements.push(i);
        }
      });
    var lottiejs = {},
      _isFrozen = !1;
    (lottiejs.play = animationManager.play),
      (lottiejs.pause = animationManager.pause),
      (lottiejs.setLocationHref = setLocationHref),
      (lottiejs.togglePause = animationManager.togglePause),
      (lottiejs.setSpeed = animationManager.setSpeed),
      (lottiejs.setDirection = animationManager.setDirection),
      (lottiejs.stop = animationManager.stop),
      (lottiejs.searchAnimations = searchAnimations),
      (lottiejs.registerAnimation = animationManager.registerAnimation),
      (lottiejs.loadAnimation = loadAnimation),
      (lottiejs.setSubframeRendering = setSubframeRendering),
      (lottiejs.resize = animationManager.resize),
      (lottiejs.goToAndStop = animationManager.goToAndStop),
      (lottiejs.destroy = animationManager.destroy),
      (lottiejs.setQuality = setQuality),
      (lottiejs.inBrowser = inBrowser),
      (lottiejs.installPlugin = installPlugin),
      (lottiejs.freeze = animationManager.freeze),
      (lottiejs.unfreeze = animationManager.unfreeze),
      (lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations),
      (lottiejs.__getFactory = getFactory),
      (lottiejs.version = '5.4.2');
    var standalone = '__[STANDALONE]__',
      animationData = '__[ANIMATIONDATA]__',
      renderer = '';
    if (standalone) {
      var scripts = document.getElementsByTagName('script'),
        index = scripts.length - 1,
        myScript = scripts[index] || { src: '' },
        queryString = myScript.src.replace(/^[^\?]+\??/, '');
      renderer = getQueryVariable('renderer');
    }
    var readyStateCheckInterval = setInterval(checkReady, 100);
    return lottiejs;
  });
