export default [
  {
    "id": "5cd49777f6ea74a9bb6ac629",
    "key": "static_code_analysis",
    "createDate": "2019-06-21T00:00:00.000+0000",
    "name": "Static Code Analysis",
    "description": "The following policy metrics are validated from SonarQube data collected in your CI pipeline.",
    "order": 0,
    "rego": "",
    "labels": [
      "test",
      "this"
    ],
    "rules": [
      {
        "key": "metric",
        "label": "Metric",
        "type": "select",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": [
          "issues-total",
          "issues-blocker",
          "issues-critical",
          "issues-major",
          "issues-minor",
          "issues-info",
          "issues-filesAnalyzed",
          "ncloc",
          "complexity",
          "violations"
        ]
      },
      {
        "key": "operator",
        "label": "Operator",
        "type": "select",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": [
          "equal",
          "not equal",
          "less than",
          "less than or equal",
          "greater than",
          "greater than or equal"
        ]
      },
      {
        "key": "value",
        "label": "Value",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": null
      }
    ]
  },
  {
    "id": "5cd498f3f6ea74a9bb6ad0f3",
    "key": "package_safelist",
    "name": "Package Safe List",
    "createDate": "2019-06-21T00:00:00.000+0000",
    "description": "The following package and artifact validation is validated against scans by JFrog Xray. Artifact and Version are validated through regular expression.",
    "order": 1,
    "rego": "",
    "rules": [
      {
        "key": "type",
        "label": "Type",
        "type": "select",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": [
          "maven"
        ]
      },
      {
        "key": "artifact",
        "label": "Package",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "Regular Expression",
        "options": null
      },
      {
        "key": "version",
        "label": "Version",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "Regular expression",
        "options": null
      }
    ]
  },
  {
    "id": "5cdd8667f6ea74a9bbaf5022",
    "key": "security_issue_analysis",
    "name": "Security Issue Analysis",
    "createDate": "2019-06-21T00:00:00.000+0000",
    "description": "Create rules to guide the general health of your repositories with respect to security and other vulnerabilities.",
    "order": 2,
    "rego": "",
    "rules": [
      {
        "key": "severity",
        "label": "Severity",
        "type": "select",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": [
          "All",
          "Critical",
          "High",
          "Medium",
          "Low"
        ]
      },
      {
        "key": "operator",
        "label": "Operator",
        "type": "select",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": [
          "equal",
          "not equal",
          "less than",
          "less than or equal",
          "greater than",
          "greater than or equal"
        ]
      },
      {
        "key": "count",
        "label": "Issue Count",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "",
        "options": null
      }
    ]
  },
  {
    "id": "5cdd8425f6ea74a9bbaf2fe6",
    "key": "cve_safelist",
    "name": "CVE Safe List",
    "createDate": "2019-06-21T00:00:00.000+0000",
    "description": "The Common Vulnerabilities & Exposures (CVE) are validated against JFrog Xray Security Issues. Artifact and Version are validated through regular expression.",
    "order": 3,
    "rego": "YXNkZmFzZGZhc2Rm",
    "rules": [
      {
        "key": "cve",
        "label": "CVE",
        "type": "text",
        "defaultValue": "",
        "required": false,
        "description": "Regular Expression",
        "options": null
      }
    ]
  },
  {
    "description": "asdsdaf",
    "key": "asdsadf",
    "name": "asdadsf",
    "order": 0,
    "rego": "cGFja2FnZSBzZWN1cml0eV9pc3N1ZV9hbmFseXNpcwoKZGVmYXVsdCB2YWxpZCA9IGZhbHNlCmRlZmF1bHQgYWxsSXNzdWVzID0gMApkZWZhdWx0IGNyaXRpY2FsSXNzdWVzID0gMApkZWZhdWx0IGhpZ2hJc3N1ZXMgPSAwCmRlZmF1bHQgbWVkaXVtSXNzdWVzID0gMApkZWZhdWx0IGxvd0lzc3VlcyA9IDAKCnZhbGlkIHsKICAgIGFsbFZhbGlkIDo9IFtvdXRwdXQgfCBvdXRwdXQgOj0gc3VtbWFyeVtfXS52YWxpZF0KICAgIGFsbChhbGxWYWxpZCkKfQoKYWxsSXNzdWVzID0gY291bnQoaW5wdXQuZGF0YS5pc3N1ZXMpCgpjcml0aWNhbElzc3Vlc0xpc3Rbb3V0cHV0XSB7CiAgICBpc3N1ZSA6PSBpbnB1dC5kYXRhLmlzc3Vlc1tfXQogICAgaXNzdWUuc2V2ZXJpdHkgPT0gIkNyaXRpY2FsIgogICAgb3V0cHV0IDo9IGlzc3VlCn0KY3JpdGljYWxJc3N1ZXMgPSBvdXRwdXQgewogICAgaXNzdWUgOj0gaW5wdXQuZGF0YS5pc3N1ZXNbX10KICAgIGlzc3VlLnNldmVyaXR5ID09ICJDcml0aWNhbCIKICAgIG91dHB1dCA9IGNvdW50KGlzc3VlKQp9IGVsc2UgPSBvdXRwdXQgewogICAgb3V0cHV0ID0gMAp9CgpoaWdoSXNzdWVzTGlzdFtvdXRwdXRdIHsKICAgIGlzc3VlIDo9IGlucHV0LmRhdGEuaXNzdWVzW19dCiAgICBpc3N1ZS5zZXZlcml0eSA9PSAiSGlnaCIKICAgIG91dHB1dCA6PSBpc3N1ZQp9CmhpZ2hJc3N1ZXMgPSBjb3VudChoaWdoSXNzdWVzTGlzdCkKCm1lZGl1bUlzc3Vlc0xpc3Rbb3V0cHV0XSB7CiAgICBpc3N1ZSA6PSBpbnB1dC5kYXRhLmlzc3Vlc1tfXQogICAgaXNzdWUuc2V2ZXJpdHkgPT0gIk1lZGl1bSIKICAgIG91dHB1dCA6PSBpc3N1ZQp9Cm1lZGl1bUlzc3VlcyA9IGNvdW50KG1lZGl1bUlzc3Vlc0xpc3QpCgpsb3dJc3N1ZXNMaXN0W291dHB1dF0gewogICAgaXNzdWUgOj0gaW5wdXQuZGF0YS5pc3N1ZXNbX10KICAgIGlzc3VlLnNldmVyaXR5ID09ICJMb3ciCiAgICBvdXRwdXQgOj0gaXNzdWUKfQpsb3dJc3N1ZXMgPSBjb3VudChsb3dJc3N1ZXNMaXN0KQoKCnN1bW1hcnlbb3V0cHV0XSB7CiAgICBvdXRwdXQgOj0gaXNzdWVzX21hdGNoZWQoIkFsbCIpCn0gewogICAgb3V0cHV0IDo9IGlzc3Vlc19tYXRjaGVkKCJDcml0aWNhbCIpCn0gewogICAgb3V0cHV0IDo9IGlzc3Vlc19tYXRjaGVkKCJIaWdoIikKfSB7CiAgICBvdXRwdXQgOj0gaXNzdWVzX21hdGNoZWQoIk1lZGl1bSIpCn0gewogICAgb3V0cHV0IDo9IGlzc3Vlc19tYXRjaGVkKCJMb3ciKQp9Cgppc3N1ZXNfZGV0YWlsID0geyAiQWxsIjogYWxsSXNzdWVzLCAiQ3JpdGljYWwiOiBjcml0aWNhbElzc3VlcywgIkhpZ2giOiBoaWdoSXNzdWVzLCAiTWVkaXVtIjogbWVkaXVtSXNzdWVzLCAiTG93IjogbG93SXNzdWVzIH0KCmlzc3Vlc19tYXRjaGVkKHNldmVyaXR5KSA9IG91dHB1dCB7CiAgICBydWxlIDo9IGlucHV0LnBvbGljeS5ydWxlc1tpXQogICAgcnVsZS5zZXZlcml0eSA9PSBzZXZlcml0eQogICAgaXNzdWVDb3VudCA6PSBpc3N1ZXNfZGV0YWlsW3NldmVyaXR5XQogICAgdmFsaWRfdmFsdWUocnVsZS5jb3VudCwgaXNzdWVDb3VudCwgcnVsZS5vcGVyYXRvcikKICAgIG91dHB1dCA6PSBpc3N1ZXNfb2JqZWN0KHNldmVyaXR5LCBpc3N1ZUNvdW50LCBydWxlLmNvdW50LCBydWxlLm9wZXJhdG9yLCB0cnVlKQp9IGVsc2UgPSBvdXRwdXQgewogICAgcnVsZSA6PSBpbnB1dC5wb2xpY3kucnVsZXNbaV0KICAgIHJ1bGUuc2V2ZXJpdHkgPT0gc2V2ZXJpdHkKICAgIGlzc3VlQ291bnQgOj0gaXNzdWVzX2RldGFpbFtzZXZlcml0eV0KICAgIG91dHB1dCA6PSBpc3N1ZXNfb2JqZWN0KHNldmVyaXR5LCBpc3N1ZUNvdW50LCBydWxlLmNvdW50LCBydWxlLm9wZXJhdG9yLCBmYWxzZSkKfSAKCmlzc3Vlc19vYmplY3Qoc2V2ZXJpdHksIGlzc3VlcywgcnVsZSwgb3BlcmF0b3IsIHZhbGlkKSA9IHsgInNldmVyaXR5Ijogc2V2ZXJpdHksICJpc3N1ZXMiIDogaXNzdWVzLCAicnVsZSI6IHJ1bGUsICJvcGVyYXRvciI6IG9wZXJhdG9yLCAidmFsaWQiOiB2YWxpZCB9Cgp2YWxpZF92YWx1ZShydWxlLCB2YWx1ZSwgb3BlcmF0b3IpIHsKICAgIG9wZXJhdG9yID09ICJlcXVhbCIKICAgIHRvX251bWJlcih2YWx1ZSkgPSB0b19udW1iZXIocnVsZSkKfSBlbHNlIHsKICAgIG9wZXJhdG9yID09ICJub3QgZXF1YWwiCiAgICB0b19udW1iZXIodmFsdWUpICE9IHRvX251bWJlcihydWxlKQp9IGVsc2UgewogICAgb3BlcmF0b3IgPT0gImxlc3MgdGhhbiIKICAgIHRvX251bWJlcih2YWx1ZSkgPCB0b19udW1iZXIocnVsZSkKfSBlbHNlIHsKICAgIG9wZXJhdG9yID09ICJsZXNzIHRoYW4gb3IgZXF1YWwiCiAgICB0b19udW1iZXIodmFsdWUpIDw9IHRvX251bWJlcihydWxlKQp9ICBlbHNlIHsKICAgIG9wZXJhdG9yID09ICJncmVhdGVyIHRoYW4iCiAgICB0b19udW1iZXIodmFsdWUpID4gdG9fbnVtYmVyKHJ1bGUpCn0gZWxzZSB7CiAgICBvcGVyYXRvciA9PSAiZ3JlYXRlciB0aGFuIG9yIGVxdWFsIgogICAgdG9fbnVtYmVyKHZhbHVlKSA+PSB0b19udW1iZXIocnVsZSkKfQoKdmlvbGF0aW9uc1t7CiAgICAibWV0cmljIjogbWV0cmljLAogICAgIm1lc3NhZ2UiOiBtZXNzYWdlLAogICAgInZhbGlkIjogZmFsc2UKfV0gewogICAgbm90IHN1bW1hcnlbaV0udmFsaWQKICAgIG1ldHJpYyA6PSBzcHJpbnRmKCIldiAlcyBJc3N1ZXMiLCBbc3VtbWFyeVtpXS5pc3N1ZXMsIHN1bW1hcnlbaV0uc2V2ZXJpdHldKQogICAgbWVzc2FnZSA6PSBzcHJpbnRmKCIldiAlcyAldiAlcyBJc3N1ZXMgd2FzIG5vdCBzYXRpc2ZpZWQiLCBbc3VtbWFyeVtpXS5pc3N1ZXMsIHN1bW1hcnlbaV0ub3BlcmF0b3IsIHN1bW1hcnlbaV0ucnVsZSwgc3VtbWFyeVtpXS5zZXZlcml0eV0pCn0=",
    "rules": [
      {
        "key": "asdasdf",
        "label": "asdsf",
        "description": "asdasdf",
        "type": "text",
        "defaultValue": "asddsf"
      }
    ],
    "id": "7J-RGvV",
    "labels": []
  }
];
