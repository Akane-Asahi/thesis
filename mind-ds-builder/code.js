(async () => {
  try {
    const page = figma.root.children.find(p => p.name === 'Foundations');
    if (!page) throw new Error('Foundations page not found');
    await figma.setCurrentPageAsync(page);

    const root = page.findOne(n => n.name === 'Foundations' && n.type === 'FRAME');
    if (!root) throw new Error('Root Foundations frame not found — run the banner/colors steps first');

    const allVars = await figma.variables.getLocalVariablesAsync();
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    function findVar(collName, varName) {
      const coll = collections.find(c => c.name === collName);
      const v = allVars.find(vv => vv.variableCollectionId === coll.id && vv.name === varName);
      if (!v) throw new Error(`Variable not found: ${collName}/${varName}`);
      return v;
    }
    function bindFill(node, variable) {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }, 'color', variable
      );
      node.fills = [paint];
    }
    const textStyles = await figma.getLocalTextStylesAsync();
    async function applyTextStyle(node, styleName) {
      const s = textStyles.find(t => t.name === styleName);
      if (!s) throw new Error('Text style not found: ' + styleName);
      await node.setTextStyleIdAsync(s.id);
    }
    function createAutoLayoutFrame(direction, name) {
      const frame = figma.createFrame();
      frame.name = name || '';
      frame.layoutMode = direction; // 'VERTICAL' | 'HORIZONTAL'
      frame.primaryAxisSizingMode = 'AUTO';
      frame.counterAxisSizingMode = 'AUTO';
      frame.itemSpacing = 0;
      frame.fills = [];
      return frame;
    }
    // NOTE: paddingTop/paddingBottom/paddingLeft/paddingRight only exist on
    // auto-layout FRAMES, never on TEXT nodes. Spacing between a heading and
    // its description is handled with a nested frame's itemSpacing instead.
    async function createHeadingBlock(title, description) {
      const block = createAutoLayoutFrame('VERTICAL', 'HeadingBlock');
      block.itemSpacing = 8;

      const heading = figma.createText();
      heading.fontName = { family: 'Lexend', style: 'SemiBold' };
      heading.characters = title;
      await applyTextStyle(heading, 'Heading/H1');
      bindFill(heading, findVar('Color', 'color/text/primary'));
      block.appendChild(heading);

      const desc = figma.createText();
      desc.fontName = { family: 'Lexend', style: 'Regular' };
      desc.characters = description;
      await applyTextStyle(desc, 'Body/Medium');
      bindFill(desc, findVar('Color', 'color/text/secondary'));
      block.appendChild(desc);
      desc.resize(720, desc.height);
      desc.layoutSizingHorizontal = 'FIXED';

      return block;
    }

    await Promise.all(['SemiBold', 'Regular', 'Medium'].map(style =>
      figma.loadFontAsync({ family: 'Lexend', style })
    ));

    const report = [];

    const spacingTokens = [
      { name: 'spacing/xs', value: 4 },
      { name: 'spacing/sm', value: 8 },
      { name: 'spacing/md', value: 16 },
      { name: 'spacing/lg', value: 24 },
      { name: 'spacing/xl', value: 32 },
      { name: 'spacing/2xl', value: 48 },
      { name: 'spacing/3xl', value: 64 },
    ];
    const radiusTokens = [
      { name: 'radius/none', value: 0 },
      { name: 'radius/sm', value: 4 },
      { name: 'radius/md', value: 8 },
      { name: 'radius/lg', value: 12 },
      { name: 'radius/full', value: 999 },
    ];

    // ---------- Spacing section (rebuild if missing OR incomplete) ----------
    let existingSpacing = root.findOne(n => n.name === 'Section/Spacing');
    if (existingSpacing) {
      const barRows = existingSpacing.children.filter(c => c.name.startsWith('Spacing/spacing/'));
      const complete = barRows.length === spacingTokens.length;
      if (complete) {
        report.push('Spacing: already exists and complete, left untouched.');
      } else {
        existingSpacing.remove();
        existingSpacing = null;
        report.push('Spacing: found incomplete section from a previous failed run — removed it to rebuild.');
      }
    }

    if (!existingSpacing) {
      const spacingSection = createAutoLayoutFrame('VERTICAL', 'Section/Spacing');
      spacingSection.itemSpacing = 20;
      spacingSection.paddingLeft = 96;
      spacingSection.paddingRight = 96;
      root.appendChild(spacingSection);
      spacingSection.layoutSizingHorizontal = 'FILL';

      const headingBlock = await createHeadingBlock(
        'Spacing',
        'A 4px base scale. All padding, gaps, and layout spacing in the system draw from these seven steps — never an arbitrary pixel value.'
      );
      spacingSection.appendChild(headingBlock);
      headingBlock.layoutSizingHorizontal = 'FILL';

      for (const tok of spacingTokens) {
        const variable = findVar('Spacing', tok.name);
        const row = createAutoLayoutFrame('HORIZONTAL', `Spacing/${tok.name}`);
        row.counterAxisAlignItems = 'CENTER';
        row.itemSpacing = 16;
        spacingSection.appendChild(row);
        row.layoutSizingHorizontal = 'FILL';

        const bar = figma.createRectangle();
        bar.resize(tok.value, 16);
        bar.cornerRadius = 3;
        bindFill(bar, findVar('Color', 'color/bg/brand'));
        bar.setBoundVariable('width', variable);
        row.appendChild(bar);

        const label = figma.createText();
        label.fontName = { family: 'Lexend', style: 'Regular' };
        label.characters = `${tok.name}   ${tok.value}px   ${variable.codeSyntax.WEB || ''}`;
        await applyTextStyle(label, 'Body/Small');
        bindFill(label, findVar('Color', 'color/text/secondary'));
        row.appendChild(label);
      }
      report.push('Spacing: created (7 bars).');
    }

    // ---------- Radius section (rebuild if missing OR incomplete) ----------
    let existingRadius = root.findOne(n => n.name === 'Section/Radius');
    if (existingRadius) {
      const row = existingRadius.findOne(n => n.name === 'Radius/Row');
      const complete = row && row.children.length === radiusTokens.length;
      if (complete) {
        report.push('Radius: already exists and complete, left untouched.');
      } else {
        existingRadius.remove();
        existingRadius = null;
        report.push('Radius: found incomplete section from a previous failed run — removed it to rebuild.');
      }
    }

    if (!existingRadius) {
      const radiusSection = createAutoLayoutFrame('VERTICAL', 'Section/Radius');
      radiusSection.itemSpacing = 20;
      radiusSection.paddingLeft = 96;
      radiusSection.paddingRight = 96;
      radiusSection.paddingTop = 24;
      root.appendChild(radiusSection);
      radiusSection.layoutSizingHorizontal = 'FILL';

      const headingBlock = await createHeadingBlock(
        'Border Radius',
        'Cards and inputs use sm/md; pills and chips use full. Figma automatically renders very large radius values as a pill.'
      );
      radiusSection.appendChild(headingBlock);
      headingBlock.layoutSizingHorizontal = 'FILL';

      const radiusRow = createAutoLayoutFrame('HORIZONTAL', 'Radius/Row');
      radiusRow.itemSpacing = 24;
      radiusRow.paddingTop = 24;
      radiusRow.paddingBottom = 24;
      radiusRow.paddingLeft = 24;
      radiusRow.paddingRight = 24;
      bindFill(radiusRow, findVar('Color', 'color/bg/surface-secondary'));
      radiusSection.appendChild(radiusRow);
      radiusRow.layoutSizingHorizontal = 'FILL';

      for (const tok of radiusTokens) {
        const variable = findVar('Spacing', tok.name);
        const wrap = createAutoLayoutFrame('VERTICAL', `Radius/${tok.name}`);
        wrap.primaryAxisAlignItems = 'CENTER';
        wrap.counterAxisAlignItems = 'CENTER';
        wrap.itemSpacing = 8;
        radiusRow.appendChild(wrap);

        const rect = figma.createRectangle();
        rect.resize(72, 72);
        const rectFill = figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0.18, g: 0.35, b: 0.52 }, opacity: 0.15 }, 'color', findVar('Color', 'color/bg/brand')
        );
        rect.fills = [rectFill];
        const rectStroke = figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0.18, g: 0.35, b: 0.52 } }, 'color', findVar('Color', 'color/border/brand')
        );
        rect.strokes = [rectStroke];
        rect.strokeWeight = 1.5;
        rect.cornerRadius = Math.min(tok.value, 36);
        rect.setBoundVariable('cornerRadius', variable);
        wrap.appendChild(rect);

        const nameLabel = figma.createText();
        nameLabel.fontName = { family: 'Lexend', style: 'Medium' };
        nameLabel.characters = tok.name.split('/').pop();
        await applyTextStyle(nameLabel, 'Label/Medium');
        bindFill(nameLabel, findVar('Color', 'color/text/primary'));
        wrap.appendChild(nameLabel);

        const valueLabel = figma.createText();
        valueLabel.fontName = { family: 'Lexend', style: 'Regular' };
        valueLabel.characters = tok.value >= 999 ? 'full' : `${tok.value}px`;
        await applyTextStyle(valueLabel, 'Caption');
        bindFill(valueLabel, findVar('Color', 'color/text/tertiary'));
        wrap.appendChild(valueLabel);
      }
      report.push('Radius: created (5 swatches).');
    }

    figma.closePlugin(report.join(' '));
  } catch (e) {
    console.error(e);
    figma.closePlugin('Error: ' + e.message);
  }
})();
