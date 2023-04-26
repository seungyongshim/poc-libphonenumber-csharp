using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.AspNetCore.Components.WebAssembly.Http;
using Microsoft.JSInterop;
using BlazorApp1;
using BlazorApp1.Shared;
using BootstrapBlazor.Components;
using PhoneNumbers;
using System.Text.Json;

namespace BlazorApp1.Pages
{
    public partial class Index
    {
        public string? Text { get; set; }

        protected override void OnInitialized()
        {
            Text = """
            {
                "Number": "0911-518-067",
                "Country": "TW"
            }
            """;

            OnChange(new ChangeEventArgs { Value = Text });
        }

        static PhoneNumberUtil PhoneNumberUtil = PhoneNumberUtil.GetInstance();
        string Number1 { get; set; }

        void OnChange(ChangeEventArgs e)
        {
            if (e.Value is string m)
            {
                try
                {
                    var x = JsonSerializer.Deserialize<Phone>(m);

                    var result = PhoneNumberUtil.Parse(x.Number, x.Country);

                    if (PhoneNumberUtil.IsValidNumberForRegion(result, x.Country))
                    {
                        Number1 = $"{result.CountryCode}{result.NationalNumber}";
                    }
                    else
                    {
                        Number1 = $"Wrong Number";
                    }
                }
                catch
                {
                    Number1 = "Invalid";
                }
            }
        }

        public record Phone
        {
            public string Number { get; init; }

            public string Country { get; init; }
        }
    }
}
