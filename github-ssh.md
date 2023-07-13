# Using Git SSH with GitHub

## Remote repositories

Git is decentralized. Any repository is a standalone, full-fledge Git repository.

A remote repo is a repo that is not in the local workspace. A remote repo could be
any where - on another computer, or even on the same computer but in different
directory.

We can list all remote repositories in the current workspace with:

```shell
git remote;
```

## Remote URL

Git implements many transport protocols for remote repositories:
HTTP(S) `http://uri`, SSH `ssh://uri`, and Git `git://uri`.

When we clone a Git repo from a HTTP(S) URL, such as a GitHub HTTP(S) URLs,
we choose HTTP(s) as the remote's transport.

A URL is used to specify how to locate the remote repositories. We can check the URL
of a remote repository with `git remote get-url <REMOTE>`:

```shell
# Get URL of remote `origin`
git remote get-url origin;
```

And set remote URL with `git remote set-url <REMOTE> <NEW_URL>`:

```shell
# Set URL of remote `origin` to https://foo.bar/baz
git remote set-url origin https://foo.bar/baz;

# Set URL of remote `origin` to ssh://git@foo.bar:/some/path/to/repo
git remote set-url origin ssh://git@foo.bar:/some/path/to/repo;
```

## GitHub.com

By default, GitHub only allows read operation over HTTPS. If we want to
push via HTTPS, a VSCode/VSCodium extension for GitHub or other devtools must be used
to authenticate.

If we only have _vanilla_ `git`, then **pushing to GitHub over HTTPS _won't work_**.

This is tiring, especially if we use Git on some computers that have no
VSCode/VSCodium support.

This is why we want to use Git over SSH for pushing to GitHub without having to rely
on Microsoft tools.

## SSH

SSH (secure shell) is used to securely execute commands on remote machines. It allows
2 machines to talk securely. It is secure because its connection is encrypted.

Before 2 machines can initiate SSH connections, they must first exchange their SSH keys.
But before they could exchange their SSH keys, they must first create the keypair.

### Creating SSH keypair

SSH supports many type of keys, from RSA to ed25519. We will be using RSA in this example.

To create a SSH RSA key with 4096-bit length, do:

```shell
ssh-keygen -t rsa -b 4096
```

The prompt will come up for you to enter the keypair filenames as well as the private key
passphrase. If you don't enter anything, default values will be used.

After the above command, the generated keys should be in the specified location,
or, in case of default location, at `~/.ssh`

### SSH configuration

User configuration for SSH is in `~/.ssh/config`. We will write down the following
to make some GitHub settings:

```
Host gh
    Hostname github.com
    User git
    PreferredAuthentications publickey
    IdentityFile /Users/prem/.ssh/id_rsa
    Compression yes
```

The `IdentityFile` refers to the location of the key generated.
