$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$target = Join-Path $root "_hostgator_upload"

if (Test-Path $target) {
    Remove-Item $target -Recurse -Force
}

New-Item -ItemType Directory -Path $target | Out-Null
Copy-Item (Join-Path $root "index.html") $target
Copy-Item (Join-Path $root "style.css") $target
Copy-Item (Join-Path $root "script.js") $target
Copy-Item (Join-Path $root ".htaccess") $target
Copy-Item (Join-Path $root "media") $target -Recurse

Write-Host "Pacote pronto em: $target"
