// Regulator finder on /foundations/regulatory-landscape.html
// General guide only. Levels: main | yes | depends | no
(function () {
  var select = document.getElementById('reg-type');
  var out = document.getElementById('reg-results');
  if (!select || !out) return;

  var REGS = ['APRA', 'ASIC', 'AUSTRAC', 'OAIC', 'ACCC'];
  var LABEL = { main: 'Main', yes: 'Yes', depends: 'Depends', no: 'Usually not' };

  var DATA = {
    bank: {
      APRA: ['main', 'Prudential standards on capital, liquidity, risk, governance and more.'],
      ASIC: ['main', 'Conduct, disclosure, credit and financial services licensing.'],
      AUSTRAC: ['yes', 'Accounts, loans and payments are designated services.'],
      OAIC: ['yes', 'Privacy Act, including credit reporting rules.'],
      ACCC: ['yes', 'Competition law (financial consumer protection mainly sits with ASIC).']
    },
    super: {
      APRA: ['main', 'SIS Act and prudential standards for RSE licensees.'],
      ASIC: ['main', 'Conduct, disclosure, design and distribution, and the trustee\'s AFS licence.'],
      AUSTRAC: ['yes', 'Superannuation services are designated services under the AML/CTF Act.'],
      OAIC: ['yes', 'Members\' personal information, including tax file numbers.'],
      ACCC: ['yes', 'Competition law.']
    },
    life: {
      APRA: ['main', 'Life Insurance Act and prudential standards.'],
      ASIC: ['main', 'Conduct, disclosure, claims handling and licensing.'],
      AUSTRAC: ['depends', 'Some life insurance products are designated services.'],
      OAIC: ['yes', 'Personal and health information.'],
      ACCC: ['yes', 'Competition law.']
    },
    general: {
      APRA: ['main', 'Insurance Act and prudential standards.'],
      ASIC: ['main', 'Conduct, disclosure, claims handling and licensing.'],
      AUSTRAC: ['no', 'General insurance is generally not a designated service.'],
      OAIC: ['yes', 'Customers\' personal information.'],
      ACCC: ['yes', 'Competition law.']
    },
    adviser: {
      APRA: ['no', 'Not APRA-regulated unless part of an APRA-regulated group.'],
      ASIC: ['main', 'AFS licensing, best interests duty, disclosure, adviser registration.'],
      AUSTRAC: ['depends', 'Only if it provides designated services.'],
      OAIC: ['depends', 'Depends on turnover and the information handled.'],
      ACCC: ['yes', 'Competition law.']
    },
    lender: {
      APRA: ['no', 'Not an ADI, although APRA collects data from some larger non-bank lenders.'],
      ASIC: ['main', 'Credit licensing and responsible lending under the National Credit Act.'],
      AUSTRAC: ['yes', 'Providing loans is a designated service.'],
      OAIC: ['depends', 'Privacy Act and credit reporting rules, depending on the business.'],
      ACCC: ['yes', 'Competition law.']
    },
    listed: {
      APRA: ['no', 'Not APRA-regulated.'],
      ASIC: ['main', 'Corporations Act, directors\' duties, continuous disclosure, financial reporting.'],
      AUSTRAC: ['no', 'Only if it provides designated services.'],
      OAIC: ['yes', 'Most listed companies exceed the $3 million turnover threshold.'],
      ACCC: ['main', 'Competition and Australian Consumer Law.']
    },
    professional: {
      APRA: ['no', 'Not APRA-regulated.'],
      ASIC: ['depends', 'If it is a company, or holds an AFS or credit licence.'],
      AUSTRAC: ['depends', 'From 1 July 2026, certain services (e.g. property transactions, setting up companies and trusts) are designated services.'],
      OAIC: ['depends', 'Depends on turnover and the information handled.'],
      ACCC: ['yes', 'Competition and Australian Consumer Law.']
    }
  };

  function render() {
    var row = DATA[select.value];
    out.innerHTML = REGS.map(function (r) {
      var lvl = row[r][0];
      return '<div class="reg-card lvl-' + lvl + '">' +
        '<div class="reg-name">' + r + '</div>' +
        '<div class="reg-level">' + LABEL[lvl] + '</div>' +
        '<div class="reg-note">' + row[r][1] + '</div></div>';
    }).join('');
  }

  select.addEventListener('change', render);
  render();
})();
